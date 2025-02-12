<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = [
        'id',
        'customer_id',
        'equipment', // equipamento
        'model',
        'password',
        'defect',
        'state_conservation', //estado de conservação
        'accessories',
        'budget_description', // descrição do orçamento
        'budget_value', // valor do orçamento
        'services_performed', // servicos executados
        'parts',
        'parts_value',
        'service_value',
        'service_cost', // custo
        'delivery_forecast', // previsao de entrega
        'service_status',
        'delivery_date', // data de entrega
        'responsible_technician', // tecnico
        'observations'
    ];

    public function customers()
    {
        return $this->belongsTo(Customer::class);
    }
}
