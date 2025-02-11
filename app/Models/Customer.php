<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public $incrementing = false;
    protected $fillable = [
        'id',
        'name',
        'cpf',
        'birth',
        'mail',
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
        'obs'
    ];
}
