<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Historias;
use App\Models\notaEvalua;
use Carbon\Carbon;

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
        
        if (count($request['NotaEvalua'])>0) {
            
            $historia=Historias::find($request->idH);
            $historia->NEUROLÓGICOPSÍQUICO=implode(',',$request['neurologicoYPsiquico']);
            $historia->NombreArch=$request['Nombre'];
            $historia->IdUser=$request['id'];
            $historia->servicio=$request['Servicio'];
            $historia->estadoC=$request['estadoC'];
            $historia->egreso=$request['EGRESO'];
            $historia->ocupacion=$request['Ocupa'];
            $historia->direccion=$request['Ubicacion'];
            $historia->OSTEOMUSCULAR=implode(',',$request['osteomuscular']);
            $historia->NERVIOSOMENTAL=implode(',',$request['nerviosoYMental']);
            $historia->EXTREMIDADES=implode(',',$request['extremidades']);
            $historia->infoAdd=$request['informacionAdicional'];
            $historia->motivoIngreso=$request['motivoIngreso'];
            $historia->enfermedadAct=$request['enfermedadActual'];
            $historia->diagnosPro=$request['diagnosticoProvisional'];
            $historia->diagnoServ=$request['diagnosticoServicio'];
            $historia->save();
            for ($i = 0; $i < count($request['NotaEvalua']); $i++) {
                $nota=notaEvalua::find($request['NotaEvalua'][$i]["id"]);
                $nota->Nota=$request['NotaEvalua'][$i]["Nota"];
                $nota->save();
            }
        }else{
            $fechaNacimiento = $request['fechaN']; // Fecha de nacimiento del request 
            $fechaActual = Carbon::now(); // Fecha actual usando Carbon 
            $fechaNacimientoDT = Carbon::parse($fechaNacimiento); // Convertir la fecha de nacimiento a un objeto Carbon 
            $edad = $fechaActual->diffInYears($fechaNacimientoDT);
            Historias::create([
            'NEUROLÓGICOPSÍQUICO'=>implode(',',$request['neurologicoYPsiquico']),
            'egreso'=>$request['EGRESO'],
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
        $idHist=Historias::where("IdUser",  $request->id)->latest()->first();
        notaEvalua::create([
            'IdHist' => $idHist->id,
            'Nota' => $request['nuevaNotaEvalua']
        ]);
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
        
        return Historias::with('Nota')->find($id);
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
        $data=Historias::with('Nota')->with('user')->find($id);
        $pdf = Pdf::loadView('historia', compact("data"));
        return $pdf->stream();
        

        
    }
}
