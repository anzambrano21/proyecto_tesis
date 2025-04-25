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
        
       
            $material = null;
        
            if ($request->id == 0) {
                // Crear un nuevo material si el id es 0
                $material = new Material();
            } else {
                // Buscar el material existente si id no es 0
                $material = Material::findOrFail($request->id);
            }
        
            // Verificar si hay un archivo en el request
            if ($request->hasFile('Archivo')) {
                $archivo = $request->file('Archivo');
                $nombreArchivo = time() . '_' . $archivo->getClientOriginalName();
                
                // Mover el nuevo archivo a la carpeta "archivos"
                $archivo->move(public_path('archivos'), $nombreArchivo);
                
                // Si es una actualización, eliminar el archivo anterior
                if (!is_null($material->Archivo)) {
                    $rutaArchivoAntiguo = public_path('archivos/' . $material->Archivo);
                    if (file_exists($rutaArchivoAntiguo)) {
                        unlink($rutaArchivoAntiguo);
                    }
                }
        
                // Asignar el nuevo nombre de archivo
                $material->Archivo = $nombreArchivo;
            }
        
            // Actualizar o asignar valores comunes
            $material->Titulo = $request->input('Titulo');
            $material->COntenido = $request->input('COntenido');
        
            // Guardar los cambios (ya sea creación o actualización)
            $material->save();
        
            return response()->json(['mensaje' => 'Operación realizada exitosamente']);
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
    public function update(Request $request,  $asugMat)
    {
        if($asugMat==1){
            AsugMat::where('IdUser',$request->IdUser)->where('IdMat',$request->IdMat)->delete();
        }
    }
    public function Asignar(Request $request)
    {
        AsugMat::create([
            'IdUser'=>$request['IdUser'],
            'IdMat'=>$request['IdMat']
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AsugMat $asugMat)
    {
        
    }
}
