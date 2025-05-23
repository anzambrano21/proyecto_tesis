<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\HistoriasControler;
use App\Http\Controllers\CitasControler;
use App\Http\Controllers\InstagramControl;
use App\Http\Controllers\AsugMatController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource("Usuario",UsuarioController::class);
Route::apiResource("Insta",InstagramControl::class);
Route::apiResource("Historia",HistoriasControler::class);
Route::apiResource("Cita",CitasControler::class);
Route::post('/log',[UsuarioController::class,'Log']);
Route::get('/all',[CitasControler::class,'Citas']);
Route::get('/proxCit/{id}',[CitasControler::class,'ProxCit']);
Route::get('/most/{id}',[HistoriasControler::class,'mostrar']);
Route::apiResource("Material",AsugMatController::class);
Route::post('/Asignar',[AsugMatController::class,'Asignar']);