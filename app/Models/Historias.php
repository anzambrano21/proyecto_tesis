<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;
class Historias extends Model
{
    use HasFactory;
    protected $fillable = [ 'NombreArch', 'IdUser', 'servicio', 'edad','estadoC',
    'ocupacion','direccion','OSTEOMUSCULAR','NERVIOSOMENTAL','EXTREMIDADES',
    'NEUROLÓGICOPSÍQUICO','infoAdd','motivoIngreso','enfermedadAct','diagnosPro','diagnoServ' ];
    public function user() { 
        return $this->belongsTo(Usuario::class, 'IdUser')->select("id",'Nombre','fechaN','sexo','Lugar',);
     }
}
