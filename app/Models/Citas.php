<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;

class Citas extends Model
{
    use HasFactory;
    protected $fillable = [ 'IdUser', 'fecha', 'hora', 'direc','pago','tipCit'];
    public function user() { 
        return $this->belongsTo(Usuario::class, 'IdUser')->select("id",'Nombre','fechaN','sexo');
     }
}
