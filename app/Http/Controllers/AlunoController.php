<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AlunoController extends Controller
{
    function Index(){
      
      return Inertia::render('Verificador');
        
    }
}
