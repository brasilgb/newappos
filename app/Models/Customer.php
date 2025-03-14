<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    public $incrementing = false;
    protected $fillable = [
        'id',
        'name',
        'cpf',
        'birth',
        'email',
        'cep',
        'uf',
        'city',
        'neighborhood',
        'street',
        'complement',
        'number',
        'phone',
        'contact',
        'whatsapp',
        'phonecontact',
        'observations'
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }
}
