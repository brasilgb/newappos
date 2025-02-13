<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary()->index();
            $table->foreignId('customer_id')->nullable()->constrained()->onDelete('cascade');
            $table->tinyInteger('equipment'); // equipamento
            $table->string('model', 50)->nullable();
            $table->string('password', 50)->nullable();
            $table->text('defect');
            $table->text('state_conservation')->nullable(); //estado de conservação
            $table->text('accessories')->nullable();
            $table->text('budget_description')->nullable(); // descrição do orçamento
            $table->float('budget_value', 16,2)->nullable(); // valor do orçamento
            $table->tinyInteger('service_status')->nullable();
            $table->string('delivery_forecast')->nullable(); // previsao de entrega
            $table->text('observations')->nullable();
            
            $table->text('services_performed')->nullable(); // servicos executados
            $table->text('parts')->nullable();
            $table->decimal('parts_value', 10, 2)->nullable();
            $table->decimal('service_value', 10, 2)->nullable();
            $table->decimal('service_cost', 10, 2)->nullable(); // custo
            $table->dateTime('delivery_date')->nullable(); // data de entrega
            $table->string('responsible_technician', 50)->nullable(); // tecnico
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
