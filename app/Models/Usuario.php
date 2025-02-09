<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Citas;
use App\Models\Historias;

class Usuario extends Model
{
    use HasFactory;
    protected $fillable = [ 'Nombre', 'Ubicacion', 'email', 'telefono','password',
    'sexo','estadoC','Ocupa','Lugar','fechaN','rol' ];
    public function citas() { return $this->hasMany(Citas::class, 'IdUser'); }
    public function Historia() {
        return $this->hasMany(Historias::class, 'IdUser'); 
        
    }
}
