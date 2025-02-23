<?php

namespace App\Http\Controllers;

use App\Models\AsugMat;
use App\Models\material;
use Illuminate\Http\Request;

class AsugMatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return material::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->has('Archivo')) {
            $archivo = $request->file('Archivo');
            
            // Generar un nombre único para el archivo
            $nombreArchivo = time() . '_' . $archivo->getClientOriginalName();
    
            // Almacenar el archivo en el disco configurado (por defecto 'local')
            $rutaArchivo = $archivo->move(public_path('archivos'), $nombreArchivo);
            // Realizar alguna acción si el índice 'file' está presente
            material::create([
                "Titulo" =>$request['Titulo'],
                "Archivo" =>$nombreArchivo,
                "COntenido" =>$request['COntenido']
               
            ]); 
            // Por ejemplo, puedes guardar el archivo o procesarlo de alguna manera
        }else {
            AsugMat::create([
                "IdUser" =>$request['IdUser'],
                "IdMat" =>$request['IdMat']
               
            ]); 
        }
   
    }

    /**
     * Display the specified resource.
     */
    public function show( $asugMat)
    {
        return AsugMat::where('IdUser',$asugMat)->with('Material')->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AsugMat $asugMat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AsugMat $asugMat)
    {
        //
    }
}
