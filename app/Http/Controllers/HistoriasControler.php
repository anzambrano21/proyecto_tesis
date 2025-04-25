<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Historias;
use App\Models\notaEvalua;
use Carbon\Carbon;
use App\Models\Trataamiento;

class HistoriasControler extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Historias::with('user')->find(4);
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
        
        // Validar la existencia de 'NotaEvalua'
        if ( $request->idH!=0) {
            $historia = Historias::find($request->idH);
    
            // Actualizar los datos principales de la historia clínica
            $historia->fill([
                'NEUROLÓGICOPSÍQUICO' => implode(',', $request['neurologicoYPsiquico']),
                'NombreArch' => $request['Nombre'],
                'IdUser' => $request['id'],
                'servicio' => $request['Servicio'],
                'estadoC' => $request['estadoC'],
                'egreso' => $request['EGRESO'],
                'ocupacion' => $request['Ocupa'],
                'direccion' => $request['Ubicacion'],
                'OSTEOMUSCULAR' => implode(',', $request['osteomuscular']),
                'NERVIOSOMENTAL' => implode(',', $request['nerviosoYMental']),
                'EXTREMIDADES' => implode(',', $request['extremidades']),
                'infoAdd' => $request['informacionAdicional'],
                'motivoIngreso' => $request['motivoIngreso'],
                'enfermedadAct' => $request['enfermedadActual'],
                'diagnosPro' => $request['diagnosticoProvisional'],
                'diagnoServ' => $request['diagnosticoServicio'],
            ]);
            $historia->save();
    
            // Actualizar las notas de evaluación
            foreach ($request['NotaEvalua'] as $notaEvalua) {
                if (!empty($notaEvalua["Nota"])) {
                    $nota = notaEvalua::find($notaEvalua["id"]);
                    $nota->Nota = $notaEvalua["Nota"];
                    $nota->save();
                }
            }
            foreach ($request['Tratamiento'] as $trata) {
                if (!empty($trata["Tratamiento"])) {
                    $nota = Trataamiento::find($trata["id"]);
                    $nota->Tratamiento = $trata["Tratamiento"];
                    $nota->save();
                }
            }
        } else {
            // Calcular la edad
            $fechaNacimiento = Carbon::parse($request['fechaN']);
            $edad = Carbon::now()->diffInYears($fechaNacimiento);
    
            // Crear una nueva historia clínica
            Historias::create([
                'NEUROLÓGICOPSÍQUICO' => implode(',', $request['neurologicoYPsiquico']),
                'egreso' => $request['EGRESO'],
                'NombreArch' => $request['Nombre'],
                'IdUser' => $request['id'],
                'servicio' => $request['Servicio'],
                'edad' => $edad,
                'estadoC' => $request['estadoC'],
                'ocupacion' => $request['Ocupa'],
                'direccion' => $request['Ubicacion'],
                'OSTEOMUSCULAR' => implode(',', $request['osteomuscular']),
                'NERVIOSOMENTAL' => implode(',', $request['nerviosoYMental']),
                'EXTREMIDADES' => implode(',', $request['extremidades']),
                'infoAdd' => $request['informacionAdicional'],
                'motivoIngreso' => $request['motivoIngreso'],
                'enfermedadAct' => $request['enfermedadActual'],
                'diagnosPro' => $request['diagnosticoProvisional'],
                'diagnoServ' => $request['diagnosticoServicio'],
            ]);
        }
    
        // Crear una nueva nota de evaluación, si existe
        $idHist = Historias::where('IdUser', $request->id)->latest()->first();
        if (!empty($request['nuevaNotaEvalua'])) {
            notaEvalua::create([
                'IdHist' => $idHist->id,
                'Nota' => $request['nuevaNotaEvalua'],
            ]);
        }
        //crear tratamiento si existe 
        
        if (!empty($request['nuevaTratamiento'])) {
            Trataamiento::create([
                'IdHist' => $idHist->id,
                'Tratamiento' => $request['nuevaTratamiento'],
            ]);
        }
    }
    
    /**
     * Display the specified resource.
     */
    public function show( $id)
    {
        
        return Historias::where("IdUser",$id)->get();
    }
    public function mostrar( $id)
    {
        
        return Historias::with('Nota')->with('Tratamiento')->find($id);
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
        
        $id = $request->query('H');
        $data=Historias::with('Nota')->with('user')->with('Tratamiento')->find($id);
        $pdf = Pdf::loadView('historia', compact("data"));
        return $pdf->stream();
        

        
    }
}
