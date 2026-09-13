<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\AcessoLog;
use Carbon\Carbon;
use App\Enums\MovimentoEnum;
use App\Enums\ResultadoEnum;
use App\Models\Estudante;

class SyncAcessosInControl extends Command
{
    protected $signature = 'incontrol:sync';
    protected $description = 'Faz login e sincroniza as entradas e saídas do InControl Web';

    public function handle()
    {
        $this->info('1. Iniciando processo de Login no InControl...');

        // O container Docker não enxerga o IP do Windows sozinho (fica numa
        // rede isolada do WSL2). Por isso o IP é calculado no WSL (onde ele
        // é visível via "ip route show default") e injetado no container
        // pela variável de ambiente WSL_HOST_IP, definida no docker-compose.yml.
        $gateway = getenv('WSL_HOST_IP');

        if (!$gateway || !filter_var($gateway, FILTER_VALIDATE_IP)) {
            $this->error('Variável WSL_HOST_IP não definida ou inválida. Confirme que ela está exportada no ~/.bashrc do WSL, mapeada no docker-compose.yml, e que o container foi recriado (sail down && sail up -d).');
            return;
        }

        $this->info("Gateway detectado: {$gateway}");

        // Mantemos "localhost" na URL (caso o InControl valide o header Host),
        // mas apontamos a conexão TCP para o gateway descoberto acima.
        $curlOptions = [
            'curl' => [
                CURLOPT_RESOLVE => ["localhost:4441:{$gateway}"],
            ],
        ];

        // ETAPA 1: FAZER LOGIN PARA PEGAR O TOKEN (Usando a rota /v1/auth/)
        $loginResponse = Http::withoutVerifying()
            ->withOptions($curlOptions)
            ->withHeaders([
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])
            ->post('https://localhost:4441/v1/auth/', [
                'username' => 'admin',
                'password' => 'admin',
            ]);

        if (!$loginResponse->successful()) {
            $this->error('Falha ao fazer login. Status: ' . $loginResponse->status());
            $this->line($loginResponse->body());
            return;
        }

        // O InControl retorna o token dentro do JSON
        $tokenData = $loginResponse->json();

        // Em muitas APIs JWT a chave se chama 'token'.
        $token = $tokenData['token'] ?? null;

        if (!$token) {
            $this->error('Login bem-sucedido, mas a chave do token não era "token". Veja o que retornou:');
            $this->line(json_encode($tokenData));
            return; // Paramos aqui para você ver qual é o nome exato da chave no terminal se der erro
        }

        $this->info('Login realizado com sucesso! Token fresquinho obtido.');
        $this->info('2. Buscando eventos de acesso...');

        // ETAPA 2: BUSCAR OS EVENTOS USANDO O NOVO TOKEN
        $authHeader = str_starts_with($token, 'JWT ') ? $token : 'JWT ' . $token;

        $eventosResponse = Http::withoutVerifying()
            ->withOptions($curlOptions)
            ->withHeaders([
                'Accept' => 'application/json',
                'Authorization' => $authHeader,
            ])
            ->get('https://localhost:4441/v1/evento', [
                'page' => 1,
                'limit' => 50,
            ]);

        if ($eventosResponse->successful()) {
            $this->info('SUCESSO TOTAL! Dados recebidos da API:');
            $this->line(json_encode($eventosResponse->json(), JSON_PRETTY_PRINT));
            $eventosJson = $eventosResponse->json('data');
            $eventosJson = collect($eventosJson)->sortBy('data_evento')->values();
            foreach ($eventosJson as $evento) {
                $dataHora = Carbon::createFromTimeStampMs($evento['data_evento'])->timezone('America/Sao_Paulo');
                $nomeAluno = $evento['pessoa_nome'];
                // Pega o último registro do aluno hoje que aconteceu ANTES deste evento atual
                $registrosHoje = AcessoLog::where(function ($query) use ($evento, $nomeAluno) {
                        $query->where('usuario', $nomeAluno)
                              ->orWhere('matricula', $evento['matricula']);
                    })
                    ->whereDate('data_hora', $dataHora)
                    ->where('data_hora', '<', $dataHora)
                    ->latest('data_hora')
                    ->first();
                if (!$registrosHoje) {
                    $movimento = MovimentoEnum::ENTRADA;
                } elseif ($registrosHoje->movimento == MovimentoEnum::ENTRADA) {
                    $movimento = MovimentoEnum::SAIDA;
                } else {
                    $movimento = MovimentoEnum::ENTRADA;
                }

                $resultado = match ((int) $evento['status']) {
                    1 => ResultadoEnum::LIBERADO,
                    0 => ResultadoEnum::NEGADO,
                    2 => ResultadoEnum::ALARME,
                    default => ResultadoEnum::DESCONHECIDO,
                };
                $estudante = Estudante::where('matricula', $evento['matricula'])->first();

                if(!$estudante && $evento['matricula'] && $evento['matricula'] !== '') {
                    $this->warn("Aluno com matrícula {$evento['matricula']} não encontrado no banco. Criando novo registro...");
                    $estudante = Estudante::create([
                        'nome' => $evento['pessoa_nome'],
                        'matricula' => $evento['matricula'],
                        'ativo' => true,
                    ]);
                }
                AcessoLog::updateOrCreate(
                    ['incontrol_id' => $evento['id']],
                    [
                        'data_hora' => $dataHora,
                        'matricula' => $evento['matricula'],
                        'usuario' => $evento['pessoa_nome'] ?: 'Desconhecido',
                        'maquina' => $evento['ponto_acesso_nome'] ?: 'Desconhecido',
                        'movimento' => $movimento,
                        'resultado' => $resultado,
                        'aluno_id' => $estudante ? $estudante->id : null,
                    ]
                );
            }
            $this->info('Sincronização concluída com sucesso! Todos os registros estão no banco.');
        } else {
            $this->error('Falhou ao buscar eventos. Status code: ' . $eventosResponse->status());
            $this->line($eventosResponse->body());
        }
    }
}