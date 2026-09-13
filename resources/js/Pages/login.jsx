import { useForm } from '@inertiajs/react';

export default function Login() {
    // 1. Configurando o formulário com o useForm
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    // 2. Função que é chamada quando clicamos em "Entrar"
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que a página recarregue do jeito antigo
        
        // Envia os dados via POST para a rota '/login' do Laravel
        post('/login'); 
    };

    // 3. O desenho da tela (HTML)
    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Fazer Login</h2>

            <form onSubmit={handleSubmit}>
                {/* Campo de E-mail */}
                <div>
                    <label>E-mail:</label>
                    <input 
                        type="email" 
                        value={data.email} 
                        onChange={(e) => setData('email', e.target.value)} 
                    />
                    {/* Se o Laravel retornar erro no email, mostra aqui */}
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>

                <br />

                {/* Campo de Senha */}
                <div>
                    <label>Senha:</label>
                    <input 
                        type="password" 
                        value={data.password} 
                        onChange={(e) => setData('password', e.target.value)} 
                    />
                </div>

                <br />

                {/* Botão de Enviar */}
                <button type="submit" disabled={processing}>
                    {processing ? 'Carregando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
}