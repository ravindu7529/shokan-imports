<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image')->nullable();
            $table->string('link')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Seed default 4 categories
        DB::table('categories')->insert([
            [
                'name' => 'CARS',
                'image' => '/assets/cat-cars.png',
                'link' => '/inventory?bodyType=Sedan',
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'BIKES',
                'image' => '/assets/cat-bikes.png',
                'link' => '/inventory?q=Bike',
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'TRUCKS',
                'image' => '/assets/cat-trucks.png',
                'link' => '/inventory?bodyType=SUV',
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'PARTS',
                'image' => '/assets/cat-parts.png',
                'link' => '/inventory?q=Parts',
                'order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
