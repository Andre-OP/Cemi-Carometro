import { useForm } from '@inertiajs/react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    InputAdornment,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f4f6f9',
                padding: 2,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 880,
                    display: 'flex',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                }}
            >
                {/* Painel institucional */}
                <Box
                    sx={{
                        flex: 1,
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        background: 'linear-gradient(160deg, #0d3b66 0%, #145c9e 100%)',
                        color: '#fff',
                        p: 5,
                    }}
                >
                    <Box>
                        <Box
                            component="img"
                            src="/cemi-icon.png"
                            alt="Brasão CEMI Cruzeiro"
                            sx={{ width: 56, height: 56, mb: 3 }}
                        />
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            CEMI Cruzeiro
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.7 }}>
                            Centro de Ensino Médio Integrado do Cruzeiro. Acompanhe de perto
                            a jornada escolar do seu filho ou filha.
                        </Typography>
                    </Box>

                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                        Portal do Responsável &middot; Secretaria de Educação do DF
                    </Typography>
                </Box>

                {/* Formulário */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: '#fff',
                        p: { xs: 4, sm: 5 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        component="img"
                        src="/cemi-icon.png"
                        alt="Brasão CEMI Cruzeiro"
                        sx={{ width: 44, height: 44, mb: 2, display: { xs: 'block', md: 'none' } }}
                    />

                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        Portal do Responsável
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Entre com seu e-mail e senha cadastrados na escola
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField
                            label="E-mail"
                            type="email"
                            fullWidth
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            placeholder="seu@email.com"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon fontSize="small" color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            placeholder="••••••••"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon fontSize="small" color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {errors.auth && (
                            <Alert severity="error" sx={{ borderRadius: 2 }}>
                                {errors.auth}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={processing}
                            size="large"
                            sx={{
                                mt: 1,
                                py: 1.3,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '15px',
                                backgroundColor: '#0d3b66',
                                '&:hover': { backgroundColor: '#0a2e50' },
                            }}
                        >
                            {processing ? <CircularProgress size={22} color="inherit" /> : 'Entrar'}
                        </Button>
                    </Box>

                    <Typography variant="caption" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
                        Dúvidas? Fale com a secretaria da escola.
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}