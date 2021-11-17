<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'product_id',
        'users_id',
        'tente_id',
        'statut',
        'price',
        'date'
    ];
}
