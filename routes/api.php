<?php
use App\Http\Controllers\Api\AcessoLogController;
Route::get('/acessos', [AcessoLogController::class, 'index']);
