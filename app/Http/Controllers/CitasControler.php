<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Citas;
use Carbon\Carbon;
use DB;
class CitasControler extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fecha actual 
        $today = Carbon::today()->startOfDay();
        // Fecha tres meses adelante 
        $threeMonthsLater = Carbon::today()->addMonths(3)->endOfDay();
        // Obtener citas entre hoy y tres meses adelante 
        $appointments = Citas::whereBetween('fecha', [$today, $threeMonthsLater])
         ->select(DB::raw('DATE(fecha) as date'), DB::raw('count(*) as count'))
          ->groupBy('date') 
          ->get();
       // return Citas::all();
        return $appointments;
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
        Citas::create([
            'IdUser'=>$request['id'],
            'fecha'=>$request['dia'],
            'hora'=>$request['hora'],
            'direc'=>$request['direc'],
            'pago'=>$request['pago'],
            'tipCit'=>$request['tipCit'],
        ]);
        return 'exito';
    }

    /**
     * Display the specified resource.
     */
    public function show( $fecha)
    {
        $horas = Citas::where('fecha', $fecha)->pluck('hora'); 
        return $horas;
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
    public function Citas()  {
         // Fecha actual 
         $today = Carbon::today()->startOfDay();
         // Fecha tres meses adelante 
         $threeMonthsLater = Carbon::today()->addMonths(1)->endOfDay();
         // Obtener citas entre hoy y tres meses adelante 
         $appointments = Citas::whereBetween('fecha', [$today, $threeMonthsLater])->with('user')->get();
         return $appointments;
        
    }
    public function ProxCit($id) {
        $ultimaCita = Citas::where('IdUser', $id)->whereDate('fecha', '>=', now()->toDateString())->first();

        // Verificar si se encontró una cita
        if ($ultimaCita) {
            return "Su proxima cita es el dia ".$ultimaCita->fecha;
        } else {
            // Manejar el caso donde no se encontró ninguna cita
        return "No tiene proxima Cita";
        }
        
    }
}
