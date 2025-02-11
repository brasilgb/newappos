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
        Schema::create('customers', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary()->index();
            $table->string('name');
            $table->string('cpf', 50)->nullable();
            $table->date('birth')->nullable();
            $table->string('mail', 50)->nullable();
            $table->string('cep', 20)->nullable();
            $table->string('uf', 20)->nullable();
            $table->string('city', 50)->nullable();
            $table->string('neighborhood', 50)->nullable();
            $table->string('street', 20)->nullable();
            $table->string('complement', 80)->nullable();
            $table->integer('number')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('contact', 50)->nullable();
            $table->string('whatsapp', 50)->nullable();
            $table->string('phonecontact', 20)->nullable();
            $table->text('obs')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
