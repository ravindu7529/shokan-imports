<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'ravindugck@gmai.com'],
            [
                'name' => 'Ravindu',
                'password' => bcrypt('Ravindu@7529'),
            ]
        );

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@shokan.com',
            'password' => bcrypt('password'),
        ]);

        $this->call([
            VehicleSeeder::class,
            BrandSeeder::class,
        ]);
    }
}
