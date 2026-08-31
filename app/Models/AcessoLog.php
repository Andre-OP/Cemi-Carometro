<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\MovimentoEnum;
use App\Enums\ResultadoEnum;

class AcessoLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'incontrol_id',
        'data_hora',
        'usuario',
        'maquina',
        'matricula',
        'movimento',
        'resultado',
    ];

    protected $casts = [
        'movimento' => MovimentoEnum::class,
        'resultado' => ResultadoEnum::class,
    ];
}