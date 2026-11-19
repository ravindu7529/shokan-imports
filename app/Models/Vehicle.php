<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $guarded = [];

    protected $casts = [
        'images' => 'array',
        'features' => 'array',
        'featured' => 'boolean',
    ];
}
