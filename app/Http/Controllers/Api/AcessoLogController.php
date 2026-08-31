<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AcessoLog;

class AcessoLogController extends Controller
{
    public function index()
    {
        return AcessoLog::latest('data_hora')->paginate(50);
    }
}