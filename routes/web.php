<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', [VehicleController::class, 'home'])->name('home');
Route::get('/inventory', [VehicleController::class, 'inventory'])->name('inventory.index');
Route::get('/api/vehicles/search', [VehicleController::class, 'searchApi'])->name('api.vehicles.search');
Route::get('/inventory/{id}', [VehicleController::class, 'show'])->name('inventory.show');
Route::get('/about', function () { return Inertia::render('AboutView'); })->name('about');
Route::get('/contact', function () { return Inertia::render('ContactView'); })->name('contact');

// Admin Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', [VehicleController::class, 'admin'])->name('admin.index');
    Route::redirect('/dashboard', '/admin')->name('dashboard');
    Route::post('/admin/vehicles', [VehicleController::class, 'store'])->name('admin.vehicles.store');
    Route::put('/admin/vehicles/{id}', [VehicleController::class, 'update'])->name('admin.vehicles.update');
    Route::delete('/admin/vehicles/{id}', [VehicleController::class, 'destroy'])->name('admin.vehicles.destroy');

    Route::post('/admin/categories', [VehicleController::class, 'storeCategory'])->name('admin.categories.store');
    Route::delete('/admin/categories/{id}', [VehicleController::class, 'destroyCategory'])->name('admin.categories.destroy');

    Route::post('/admin/presets', [VehicleController::class, 'storePreset'])->name('admin.presets.store');
    Route::delete('/admin/presets/{id}', [VehicleController::class, 'destroyPreset'])->name('admin.presets.destroy');

    Route::post('/admin/brands', [VehicleController::class, 'storeBrand'])->name('admin.brands.store');
    Route::delete('/admin/brands/{id}', [VehicleController::class, 'destroyBrand'])->name('admin.brands.destroy');

    Route::post('/admin/upload-image', [VehicleController::class, 'uploadImage'])->name('admin.upload-image');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
