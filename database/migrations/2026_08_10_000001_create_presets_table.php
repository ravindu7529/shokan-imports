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
        Schema::create('presets', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // 'feature', 'image', 'equipment'
            $table->string('name');
            $table->string('value')->nullable(); // URL or tag
            $table->string('category')->default('General'); // Equipment category/group
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Seed initial presets
        $initialFeatures = [
            'ATTESA E-TS AWD System',
            'Torsen Limited Slip Differential',
            'Original Recaro bucket seats',
            'Brembo High Performance Brakes',
            'Carbon Fiber Multi-Function Display',
            'Xenon Headlights',
            'Nismo Aero Package',
            'Original Japanese Export Certificate',
            'Right-Hand Drive (RHD)',
            'Climate Control AC',
            'Bilstein Damper Package',
            'Retro CarPlay Stereo Unit',
            'Original Forged BBS Wheels',
            'Kakimoto Racing Exhaust',
            'Ohlins Adjustable Coilovers',
            'Apex-i Power FC ECU',
            'HKS Intercooler Kit',
            'Defi Link Gauge Suite'
        ];

        foreach ($initialFeatures as $feature) {
            DB::table('presets')->insert([
                'type' => 'equipment',
                'name' => $feature,
                'value' => $feature,
                'category' => 'Specialized Equipment',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $initialImages = [
            ['label' => 'Nissan Skyline (Bayside Blue)', 'url' => 'https://images.unsplash.com/photo-1615887023516-9b6bcd559e87?auto=format&fit=crop&q=80&w=800'],
            ['label' => 'Nissan Skyline Rear', 'url' => 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800'],
            ['label' => 'Toyota Supra RZ (Red)', 'url' => 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=800'],
            ['label' => 'Mazda RX-7 FD (White)', 'url' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'],
            ['label' => 'Honda NSX (Yellow)', 'url' => 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'],
        ];

        foreach ($initialImages as $img) {
            DB::table('presets')->insert([
                'type' => 'image',
                'name' => $img['label'],
                'value' => $img['url'],
                'category' => 'Media',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('presets');
    }
};
