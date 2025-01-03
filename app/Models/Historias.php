<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historias extends Model
{
    use HasFactory;
    protected $fillable = [ 'NombreArch', 'IdUser', 'servicio', 'edad','estadoC',
    'ocupacion','direccion','OSTEOMUSCULAR','NERVIOSOMENTAL','EXTREMIDADES','NEUROLÓGICOPSÍQUICO','infoAdd','motivoIngreso','enfermedadAct','diagnosPro','diagnoServ' ];
}
