import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Card, CardContent, Divider, Alert, Paper } from '@mui/material';
import { Html5QrcodeScanner } from "html5-qrcode";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline/index.js';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline/index.js';

export default function Verificador() {

    const [aluno, setAluno] = useState(null);

    const [status, setStatus] = useState({
        severity: 'info',
        msg: 'Aguardando leitura do QR Code...'
    });

    useEffect(() => {

        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: 250,
                rememberLastUsedCamera: true,
            }
        );

        const onScanSuccess = (decodedText, decodedResult) => {
        };

        const onScanFailure = (error) => {
            console.warn(`Erro na leitura do QR Code: ${error}`);
        }

        scanner.render(onScanSuccess, onScanFailure);

        return () => {
            scanner.clear().catch(error => {
                console.error("Erro ao limpar a câmera:", error);
            });
        };

    }, []);

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>

                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                >
                    SISTEMA DE ACESSO
                </Typography>

                <Alert
                    severity={status.severity}
                    icon={
                        status.severity === 'success'
                            ? <CheckCircleOutlineIcon />
                            : <ErrorOutlineIcon />
                    }
                    sx={{ mb: 3 }}
                >
                    {status.msg}
                </Alert>

                <Box
                    id="reader"
                    sx={{
                        width: '100%',
                        mb: 3,
                        '& video': {
                            borderRadius: '12px'
                        }
                    }}
                />

                {aluno && (
                    <Card
                        variant="outlined"
                        sx={{
                            borderLeft: '8px solid #2e7d32',
                            textAlign: 'left'
                        }}
                    >
                        <CardContent>

                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 'bold' }}
                            >
                                {aluno.nome}
                            </Typography>

                            <Divider sx={{ my: 1 }} />

                            <Typography variant="body2">
                                <strong>CURSO:</strong> {aluno.curso}
                            </Typography>

                            <Typography variant="body2">
                                <strong>MATRÍCULA:</strong> {aluno.matricula}
                            </Typography>

                        </CardContent>
                    </Card>
                )}

            </Paper>
        </Container>
    );
}