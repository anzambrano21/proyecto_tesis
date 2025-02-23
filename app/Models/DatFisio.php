<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatFisio extends Model
{
    use HasFactory;
    protected $table="dat_fisios";
    protected $fillable = [ 'Nombre', 'Apellido','Direccion','Telefono','Correo','dias' ];
}
