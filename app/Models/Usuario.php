<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Citas;

class Usuario extends Model
{
    use HasFactory;
    protected $fillable = [ 'Nombre', 'Ubicacion', 'email', 'telefono','password',
    'sexo','estadoC','Ocupa','Lugar','fechaN' ];
    public function citas() { return $this->hasMany(Citas::class, 'IdUser'); }
}
