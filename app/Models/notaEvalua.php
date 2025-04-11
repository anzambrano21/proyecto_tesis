<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Historias;
class notaEvalua extends Model
{
    use HasFactory;
    protected $table="nota_evaluas";
    protected $fillable = ['IdHist', 'Nota' ];
    public function Historia() { 
        return $this->belongsTo(Historias::class, 'IdHist');
    }
}
