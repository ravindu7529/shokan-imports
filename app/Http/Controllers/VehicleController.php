<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Models\Category;
use App\Models\Preset;
use App\Models\Brand;

class VehicleController extends Controller
{
    public function home()
    {
        $vehicles = Vehicle::orderBy('id', 'desc')->get();
        $categories = Category::orderBy('order', 'asc')->get();
        $brands = Brand::orderBy('order', 'asc')->orderBy('name', 'asc')->get();
        return inertia('HomeView', [
            'vehicles' => $vehicles,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    public function inventory()
    {
        $vehicles = Vehicle::orderBy('id', 'desc')->get();
        return inertia('InventoryView', [
            'vehicles' => $vehicles
        ]);
    }

    public function show($id)
    {
        $vehicle = Vehicle::findOrFail($id);
        return inertia('VehicleDetailsView', [
            'vehicle' => $vehicle
        ]);
    }

    public function searchApi(Request $request)
    {
        $q = trim($request->query('q', ''));
        if (empty($q)) {
            return response()->json([]);
        }

        $vehicles = Vehicle::where(function ($query) use ($q) {
            $query->where('make', 'like', "%{$q}%")
                  ->orWhere('model', 'like', "%{$q}%")
                  ->orWhere('year', 'like', "%{$q}%")
                  ->orWhere('trim', 'like', "%{$q}%")
                  ->orWhere('bodyType', 'like', "%{$q}%")
                  ->orWhere('engine', 'like', "%{$q}%")
                  ->orWhere('transmission', 'like', "%{$q}%")
                  ->orWhere('vin', 'like', "%{$q}%");
        })
        ->orderBy('id', 'desc')
        ->limit(6)
        ->get();

        return response()->json($vehicles);
    }

    public function admin()
    {
        $vehicles = Vehicle::orderBy('id', 'desc')->get();
        $categories = Category::orderBy('order', 'asc')->get();
        $presets = Preset::all();
        $brands = Brand::orderBy('order', 'asc')->orderBy('name', 'asc')->get();
        return inertia('AdminView', [
            'vehicles' => $vehicles,
            'categories' => $categories,
            'presets' => $presets,
            'brands' => $brands,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'make' => 'required|string',
            'model' => 'required|string',
            'year' => 'required|integer',
            'trim' => 'nullable|string',
            'price' => 'required|numeric',
            'mileage' => 'required|integer',
            'vin' => 'required|string|unique:vehicles,vin',
            'engine' => 'required|string',
            'transmission' => 'required|string',
            'fuelType' => 'required|string',
            'drivetrain' => 'required|string',
            'exteriorColor' => 'required|string',
            'interiorColor' => 'required|string',
            'bodyType' => 'required|string',
            'description' => 'required|string',
            'featured' => 'boolean',
            'images' => 'array',
            'features' => 'array'
        ]);

        Vehicle::create($data);
        return redirect()->back()->with('success', 'Vehicle created successfully.');
    }

    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::findOrFail($id);
        $data = $request->validate([
            'make' => 'required|string',
            'model' => 'required|string',
            'year' => 'required|integer',
            'trim' => 'nullable|string',
            'price' => 'required|numeric',
            'mileage' => 'required|integer',
            'vin' => 'required|string|unique:vehicles,vin,' . $id,
            'engine' => 'required|string',
            'transmission' => 'required|string',
            'fuelType' => 'required|string',
            'drivetrain' => 'required|string',
            'exteriorColor' => 'required|string',
            'interiorColor' => 'required|string',
            'bodyType' => 'required|string',
            'description' => 'required|string',
            'featured' => 'boolean',
            'images' => 'array',
            'features' => 'array'
        ]);

        $vehicle->update($data);
        return redirect()->back()->with('success', 'Vehicle updated successfully.');
    }

    public function destroy($id)
    {
        Vehicle::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Vehicle deleted successfully.');
    }

    public function storeCategory(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|string',
            'link' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        Category::create($data);
        return redirect()->back()->with('success', 'Category created successfully.');
    }

    public function destroyCategory($id)
    {
        Category::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Category deleted successfully.');
    }

    public function storePreset(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string',
            'name' => 'required|string|max:255',
            'value' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        if (empty($data['value'])) {
            $data['value'] = $data['name'];
        }

        Preset::create($data);
        return redirect()->back()->with('success', 'Preset created successfully.');
    }

    public function destroyPreset($id)
    {
        Preset::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Preset deleted successfully.');
    }

    public function storeBrand(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
        ]);

        if (empty($data['logo'])) {
            $data['logo'] = strtoupper($data['name']);
        }

        Brand::create($data);
        return redirect()->back()->with('success', 'Brand created successfully.');
    }

    public function destroyBrand($id)
    {
        Brand::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Brand deleted successfully.');
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:10240', // Max 10MB
        ]);

        $file = $request->file('image');
        $uploadDir = public_path('uploads/vehicles');

        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = 'vehicle_' . time() . '_' . uniqid() . '.webp';
        $targetPath = $uploadDir . '/' . $filename;

        $imagePath = $file->getRealPath();
        $imageInfo = getimagesize($imagePath);
        $mime = $imageInfo['mime'] ?? '';

        $srcImage = null;
        switch ($mime) {
            case 'image/jpeg':
            case 'image/jpg':
                $srcImage = @imagecreatefromjpeg($imagePath);
                break;
            case 'image/png':
                $srcImage = @imagecreatefrompng($imagePath);
                if ($srcImage) {
                    imagepalettetotruecolor($srcImage);
                    imagealphablending($srcImage, true);
                    imagesavealpha($srcImage, true);
                }
                break;
            case 'image/webp':
                $srcImage = @imagecreatefromwebp($imagePath);
                break;
            case 'image/gif':
                $srcImage = @imagecreatefromgif($imagePath);
                break;
        }

        if ($srcImage) {
            imagewebp($srcImage, $targetPath, 82);
            imagedestroy($srcImage);
        } else {
            $file->move($uploadDir, $filename);
        }

        return response()->json([
            'url' => '/uploads/vehicles/' . $filename
        ]);
    }
}
