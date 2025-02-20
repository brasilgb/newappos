<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    protected $fillable = [
        'id',
        'customer_id',
        'user_id',
        'schedules',
        'service',
        'details',
        'status',
        'observations'
    ];
 
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
 
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
