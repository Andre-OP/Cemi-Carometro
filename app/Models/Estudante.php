<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\AcessoLog;

class Estudante extends Model
{
    protected $table = 'estudantes';
    protected $fillable = ['nome','matricula','serie','turma','ativo'];

    public function responsaveis(){
        return $this->belongsToMany(User::class, 'estudante_responsavel' ,'estudante_id','user_id');
    }

    public function acessoLogs(){
        return $this->hasMany(AcessoLog::class, 'aluno_id');
    }

    protected $casts = [
    'ativo' => 'boolean',
    'created_at' => 'datetime',
    'updated_at' => 'datetime',
];
}
