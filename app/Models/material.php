<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\material;
class material extends Model
{
    use HasFactory;
    protected $fillable = [ 'Titulo', 'Archivo','COntenido' ];
    public function Asignar() {
        return $this->hasMany(AsugMat::class, 'id'); 
        
    }
}
