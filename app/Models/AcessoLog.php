<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\MovimentoEnum;
use App\Enums\ResultadoEnum;
use App\Models\Estudante;

class AcessoLog extends Model
{
    use HasFactory;

    protected $table = 'acesso_logs';
    protected $fillable = [
        'incontrol_id',
        'data_hora',
        'usuario',
        'aluno_id',
        'maquina',
        'matricula',
        'movimento',
        'resultado',
    ];

    protected $casts = [
        'movimento' => MovimentoEnum::class,
        'resultado' => ResultadoEnum::class,
    ];

    public function estudante(){
        return $this->belongsTo(Estudante::class, 'aluno_id');
    }
}