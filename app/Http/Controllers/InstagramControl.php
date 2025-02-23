<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Instagram;
use App\Models\DatFisio;

class InstagramControl extends Controller
{
    private $daysMap = [
        'Lunes' => 1,
        'Martes' => 2,
        'Miércoles' => 3,
        'Jueves' => 4,
        'Viernes' => 5,
        'Sábado' => 6,
        'Domingo' => 0,
    ];
    /**
     * Display a listing of the resource.
     */
    public function convertirDias($datFi)
    {
        return array_map(function($day) {
            return $this->daysMap[$day];
        }, explode(',', $datFi->dias));
    }
    public function index()
    {
        $insta = Instagram::first();
        $datFi = DatFisio::first();
        return [
            'IDuser'=> $insta->IDuser,
            'Token'=> $insta->Token,
            'Nombre'=> $datFi->Nombre,
            'Apellido'=> $datFi->Apellido,
            'Direccion'=> $datFi->Direccion,
            'Telefono'=> $datFi->Telefono,
            'Correo'=> $datFi->Correo,
            'Dias'=>explode(',', $datFi->dias)
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        

        //crear nuevo registro necesitas modelo instagram y datos fisio 
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $datFi = DatFisio::first();
        return $this->convertirDias($datFi);
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
        $insta = Instagram::first();
        $datFi = DatFisio::first();
        $insta->IDuser = $request->IDuser;
        $insta->Token = $request->Token;
        $datFi->Nombre = $request->Nombre;
        $datFi->Apellido = $request->Apellido;
        $datFi->Direccion = $request->Direccion;
        $datFi->Telefono = $request->Telefono;
        $datFi->Correo = $request->Correo;
        $datFi->dias=$request->dias;
        $insta->save();
        $datFi->save();
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
