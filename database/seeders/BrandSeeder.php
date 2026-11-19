<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['name' => 'Acura', 'logo' => 'ACURA', 'order' => 1],
            ['name' => 'Aston Martin', 'logo' => 'ASTON MARTIN', 'order' => 2],
            ['name' => 'Audi', 'logo' => 'AUDI', 'order' => 3],
            ['name' => 'Cadillac', 'logo' => 'CADILLAC', 'order' => 4],
            ['name' => 'Dodge', 'logo' => 'DODGE', 'order' => 5],
            ['name' => 'Fiat', 'logo' => 'FIAT', 'order' => 6],
            ['name' => 'Ford', 'logo' => 'FORD', 'order' => 7],
            ['name' => 'Honda', 'logo' => 'HONDA', 'order' => 8],
            ['name' => 'Hyundai', 'logo' => 'HYUNDAI', 'order' => 9],
            ['name' => 'Isuzu', 'logo' => 'ISUZU', 'order' => 10],
            ['name' => 'Kia', 'logo' => 'KIA', 'order' => 11],
            ['name' => 'Land Rover', 'logo' => 'LAND ROVER', 'order' => 12],
            ['name' => 'Lexus', 'logo' => 'LEXUS', 'order' => 13],
            ['name' => 'Lotus', 'logo' => 'LOTUS', 'order' => 14],
            ['name' => 'Mercedes-Benz', 'logo' => 'MERCEDES', 'order' => 15],
            ['name' => 'Mitsubishi', 'logo' => 'MITSUBISHI', 'order' => 16],
            ['name' => 'Nissan', 'logo' => 'NISSAN', 'order' => 17],
            ['name' => 'Peugeot', 'logo' => 'PEUGEOT', 'order' => 18],
            ['name' => 'Mini', 'logo' => 'MINI', 'order' => 19],
            ['name' => 'Subaru', 'logo' => 'SUBARU', 'order' => 20],
        ];

        foreach ($brands as $brand) {
            Brand::updateOrCreate(
                ['name' => $brand['name']],
                ['logo' => $brand['logo'], 'order' => $brand['order']]
            );
        }
    }
}
