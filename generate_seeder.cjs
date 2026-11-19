const fs = require('fs');

const tsCode = fs.readFileSync('../src/data/vehicles.ts', 'utf-8');
const jsCode = tsCode.replace(/export const VEHICLES: Vehicle\[\] =/g, 'module.exports = ').replace(/import { Vehicle } from '..\/types';/g, '');

fs.writeFileSync('temp_data.cjs', jsCode);
const vehicles = require('./temp_data.cjs');

const jsonStr = JSON.stringify(vehicles);

const phpCode = `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use App\\Models\\Vehicle;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $json = <<<JSON
${jsonStr}
JSON;
        $vehicles = json_decode($json, true);
        foreach($vehicles as $v) {
            unset($v['id']); // Removing string ID to auto-increment
            Vehicle::create($v);
        }
    }
}
`;

fs.writeFileSync('database/seeders/VehicleSeeder.php', phpCode);
