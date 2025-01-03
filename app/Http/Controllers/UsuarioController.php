<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Usuario::create([
            "Nombre" =>$request['nom'],
            "Ubicacion" =>$request['ubica'],
            "email" =>$request['email'],
            "telefono" =>$request['telef'],
            "password" =>Hash::make($request['contra']),
            "rol"=>'paciente'
        ]);
    }
    public function Log(Request $request) {
        $user = Usuario::where('email', $request->email)->first();
        if ($user && Hash::check($request->contra, $user->password)) {
            if ($user->rol="medico"){
                Session::put("Rol", 'medico'); 
            }else{
                Session::put("Rol", 'paciente');
            }
             // Autenticar al usuario 
             Session::put("user", $user["NombreUse"]);
             Session::put("home", "Login successful");
             Session::put("id", $user["id"]);
             return Session::all();

             } else {
                Session::put("home", $user);
                return Session::all();
    ;
             }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Usuario::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
