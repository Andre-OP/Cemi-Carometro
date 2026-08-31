import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip, AppBar, Toolbar, Grid, Card, CardContent, TextField, InputAdornment } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export default function Verificador() {
    const [acessos, setAcessos] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [estatisticas, setEstatisticas] = useState({ total: 0, entradas: 0, saidas: 0 });

    useEffect(() => {
        fetch('/api/acessos')
            .then(res => res.json())
            .then(data => {
                const fetchedData = data.data || data;
                setAcessos(fetchedData);
                
                const total = fetchedData.length;
                const entradas = fetchedData.filter(item => item.movimento === 'Entrada').length;
                const saidas = fetchedData.filter(item => item.movimento === 'Saída').length;
                setEstatisticas({ total, entradas, saidas });
            })
            .catch(err => console.error('Erro ao buscar acessos:', err));
    }, []);

    // Filtra os acessos pelo nome do aluno ou número de matrícula
    const acessosFiltrados = acessos.filter(log => 
        (log.usuario && log.usuario.toLowerCase().includes(filtro.toLowerCase())) ||
        (log.matricula && log.matricula.toLowerCase().includes(filtro.toLowerCase()))
    );

    return (
        <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', pb: 6 }}>
            <AppBar position="static" sx={{ bgcolor: '#0c326f', boxShadow: 'none', borderBottom: '4px solid #ffcd07' }}>
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <SchoolIcon sx={{ fontSize: 32, color: '#ffcd07' }} />
                        <Box>
                            <Typography variant="subtitle2" sx={{ letterSpacing: 1, color: '#b0bec5', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                                Centro de Ensino Médio Integrado • CEMI Cruzeiro - DF
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                                Portal de Acompanhamento Escolar (Pais e Responsáveis)
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip label="Área da Família" color="success" size="small" sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'flex' } }} />
                        <Avatar
                            src="/cemi-icon.png"
                            alt="Logo CEMI Cruzeiro"
                            sx={{ width: 70, height: 70, bgcolor: '#fff', p: 0.5 }}
                            variant="square"
                        />
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ mb: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 2, borderLeft: '5px solid #1976d2', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <VerifiedUserIcon color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="body2" sx={{ color: '#0d47a1', fontWeight: 500 }}>
                        Prezado(a) responsável, acompanhe abaixo o registro oficial de entradas e saídas do seu filho(a) nas dependências do CEMI Cruzeiro. Utilize a busca para filtrar pelo nome ou matrícula.
                    </Typography>
                </Box>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                        <Card elevation={1} sx={{ borderRadius: 2, borderLeft: '5px solid #0c326f' }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>TOTAL DE ACESSOS</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0c326f', mt: 0.5 }}>{estatisticas.total}</Typography>
                                </Box>
                                <PeopleIcon sx={{ fontSize: 40, color: '#0c326f', opacity: 0.2 }} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card elevation={1} sx={{ borderRadius: 2, borderLeft: '5px solid #2e7d32' }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>TOTAL DE ENTRADAS</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32', mt: 0.5 }}>{estatisticas.entradas}</Typography>
                                </Box>
                                <AccessTimeIcon sx={{ fontSize: 40, color: '#2e7d32', opacity: 0.2 }} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card elevation={1} sx={{ borderRadius: 2, borderLeft: '5px solid #1976d2' }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>TOTAL DE SAÍDAS</Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2', mt: 0.5 }}>{estatisticas.saidas}</Typography>
                                </Box>
                                <AccessTimeIcon sx={{ fontSize: 40, color: '#1976d2', opacity: 0.2 }} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, bgcolor: '#ffffff' }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2, mb: 3, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <AccessTimeIcon color="primary" />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                Extrato de Movimentação do Estudante
                            </Typography>
                        </Box>
                        
                        <TextField
                            size="small"
                            placeholder="Pesquisar por nome ou matrícula..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ width: { xs: '100%', sm: '300px' } }}
                        />
                    </Box>

                    <Box sx={{ overflowX: 'auto' }}>
                        <Table size="medium">
                            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Estudante</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Matrícula</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Movimento</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Data / Hora</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {acessosFiltrados.length > 0 ? (
                                    acessosFiltrados.map((log, index) => (
                                        <TableRow key={log.id || index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>{log.id}</TableCell>
                                            <TableCell sx={{ fontWeight: 500 }}>{log.usuario}</TableCell>
                                            <TableCell>{log.matricula}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={log.movimento || 'Acesso'} 
                                                    color={log.movimento === 'Entrada' ? 'success' : 'primary'} 
                                                    size="small" 
                                                    sx={{ fontWeight: 600, minWidth: 80 }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={log.resultado || 'N/D'} 
                                                    color={log.resultado === 'Autorizado' || log.resultado === 'Sucesso' ? 'success' : 'default'} 
                                                    size="small" 
                                                    variant="outlined"
                                                    sx={{ fontWeight: 500 }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{log.data_hora || log.created_at}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                                            Nenhum registro encontrado para os critérios informados.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}