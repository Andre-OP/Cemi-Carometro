<?php

namespace App\Enums;

enum ResultadoEnum: string
{
    case LIBERADO = 'Acesso Liberado';
    case NEGADO = 'Acesso Negado';
    case ALARME = 'Alarme / Problema na Máquina';
    case DESCONHECIDO = 'Desconhecido';
}