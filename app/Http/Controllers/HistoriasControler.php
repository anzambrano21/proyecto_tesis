<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Historias;
use Carbon\Carbon;

class HistoriasControler extends Controller
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
        $fechaNacimiento = $request['fechaN']; // Fecha de nacimiento del request 
        $fechaActual = Carbon::now(); // Fecha actual usando Carbon 
        $fechaNacimientoDT = Carbon::parse($fechaNacimiento); // Convertir la fecha de nacimiento a un objeto Carbon 
        $edad = $fechaActual->diffInYears($fechaNacimientoDT);
        Historias::create([
            'NEUROLÓGICOPSÍQUICO'=>implode(',',$request['neurologicoYPsiquico']),
            'NombreArch'=>$request['Nombre'],
            'IdUser'=>$request['id'],
            'servicio'=>$request['Servicio'],
            'edad'=> $edad,//
            'estadoC'=>$request['estadoC'],
            'ocupacion'=>$request['Ocupa'],
            'direccion'=>$request['Ubicacion'],
            'OSTEOMUSCULAR'=>implode(',',$request['osteomuscular']),
            'NERVIOSOMENTAL'=>implode(',',$request['nerviosoYMental']),
            'EXTREMIDADES'=>implode(',',$request['extremidades']),
            'infoAdd'=>$request['informacionAdicional'],
            'motivoIngreso'=>$request['motivoIngreso'],
            'enfermedadAct'=>$request['enfermedadActual'],
            'diagnosPro'=>$request['diagnosticoProvisional'],
            'diagnoServ'=>$request['diagnosticoServicio'],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function pdf(Request $request) {
        $nombre = $request->query('nombre');
        $edad = $request->query('edad');
        $data=Usuario::all();
        $pdf = Pdf::loadView('historia', compact("data"));
        return $pdf->stream();
        

        
    }
}
