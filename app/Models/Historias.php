<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;
use App\Models\notaEvalua;
class Historias extends Model
{
    use HasFactory;
    protected $fillable = [ 'id','egreso', 'NombreArch', 'IdUser', 'servicio', 'edad','estadoC',
    'ocupacion','direccion','OSTEOMUSCULAR','NERVIOSOMENTAL','EXTREMIDADES',
    'NEUROLÓGICOPSÍQUICO','infoAdd','motivoIngreso','enfermedadAct','diagnosPro','diagnoServ' ];
    public function user() { 
        return $this->belongsTo(Usuario::class, 'IdUser')->select("id",'Nombre','fechaN','sexo','Lugar',);
    }
    public function Nota() {
        return $this->hasMany(notaEvalua::class, 'IdHist'); 
        
    }

}
