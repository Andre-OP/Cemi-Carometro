<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('acesso_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('incontrol_id')->unique(); 
            
            $table->dateTime('data_hora');
            $table->string('usuario')->nullable();
            $table->string('maquina')->nullable();
            $table->string('matricula')->nullable();
            
            // Usamos string para armazenar perfeitamente os valores dos Enums ('Entrada', 'Saída', etc.)
            $table->string('movimento')->nullable(); 
            $table->string('resultado')->nullable(); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acesso_logs');
    }
};
