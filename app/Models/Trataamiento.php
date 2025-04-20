<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Historias;
class Trataamiento extends Model
{
    use HasFactory;
    
    protected $table="trataamientos";
    protected $fillable = ['IdHist', 'Tratamiento' ];
    public function Historia() { 
        return $this->belongsTo(Historias::class, 'IdHist');
    }
}
