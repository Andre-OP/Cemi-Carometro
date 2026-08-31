<?php

namespace App\Enums;

enum MovimentoEnum: string
{
    case ENTRADA = 'Entrada';
    case SAIDA = 'Saída';
    case DESCONHECIDO = 'Desconhecido';
}