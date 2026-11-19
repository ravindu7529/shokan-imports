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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->integer('year');
            $table->string('make');
            $table->string('model');
            $table->string('trim')->nullable();
            $table->integer('price');
            $table->integer('mileage');
            $table->string('vin')->unique();
            $table->string('engine');
            $table->string('transmission');
            $table->string('fuelType');
            $table->string('drivetrain');
            $table->string('exteriorColor');
            $table->string('interiorColor');
            $table->string('bodyType');
            $table->json('images')->nullable();
            $table->text('description');
            $table->json('features')->nullable();
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
