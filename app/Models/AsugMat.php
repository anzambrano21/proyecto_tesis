<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\material;
class AsugMat extends Model
{
    use HasFactory;
    protected $table="asig_mats";
    protected $fillable = [ 'IdUser', 'IdMat'];
    public function Material() { 
        return $this->belongsTo(material::class, 'IdMat')->select("id",'Titulo','Archivo','COntenido');
     }
}
