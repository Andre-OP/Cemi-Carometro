<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function create(){
        return Inertia::render('login');
    }

    public function store(Request $request){
        $credentials = $request->validate(
            [
                'email' => ['required','email'],
                'password' => ['required'],
            ]
        );

        if(auth()->attempt($credentials)){
            $request->session()->regenerate();
            return redirect()->intended('/');
        }

        return back()->withErrors([
            'email' => 'Desculpe, as credenciais não batem com nossos registros, tente novamente.',
        ]);
    }
}
