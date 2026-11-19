import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Vehicle, Category, Preset, Brand } from '../types';
import { Plus, Trash2, Save, Car, Image as ImageIcon, FileText, Check, ArrowLeft, PlusCircle, AlertCircle, Sparkles, FolderPlus, Tag, Sliders, UploadCloud, Layers, Settings, ShieldAlert } from 'lucide-react';

interface AdminViewProps {
  vehicles: Vehicle[];
  categories?: Category[];
  presets?: Preset[];
  brands?: Brand[];
  onAddVehicle?: (vehicle: Vehicle) => void;
  onDeleteVehicle?: (id: string) => void;
}

const PRESET_FEATURES = [
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
  'Original Forged BBS Wheels'
];

export default function AdminView({ vehicles = [], categories = [], presets = [], brands = [], onAddVehicle, onDeleteVehicle }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'categories' | 'brands' | 'masters'>('list');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Pagination State for Active Inventory (10 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(vehicles.length / ITEMS_PER_PAGE) || 1;
  const paginatedVehicles = vehicles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Category Form State
  const [catName, setCatName] = useState('');
  const [catImage, setCatImage] = useState('');
  const [catLink, setCatLink] = useState('');
  const [isSubmittingCat, setIsSubmittingCat] = useState(false);
  const [uploadingCatImage, setUploadingCatImage] = useState(false);

  // Brand Form State
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState('');
  const [isSubmittingBrand, setIsSubmittingBrand] = useState(false);

  // Master Equipment Presets Form State
  const [presetName, setPresetName] = useState('');
  const [presetCategory, setPresetCategory] = useState('Specialized Equipment');
  const [isSubmittingPreset, setIsSubmittingPreset] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleAddCategorySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) {
      setErrorMessage('Category name is required.');
      return;
    }
    if (!catImage.trim()) {
      setErrorMessage('Please upload a category image.');
      return;
    }

    setIsSubmittingCat(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    router.post('/admin/categories', {
      name: catName.trim().toUpperCase(),
      image: catImage.trim(),
      link: catLink.trim() || `/inventory?q=${encodeURIComponent(catName.trim())}`,
    }, {
      onSuccess: () => {
        setCatName('');
        setCatImage('');
        setCatLink('');
        setIsSubmittingCat(false);
        setSuccessMessage('New category created successfully with uploaded image!');
      },
      onError: () => {
        setIsSubmittingCat(false);
        setErrorMessage('Failed to add category. Please check your inputs.');
      }
    });
  };

  const handleCatFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingCatImage(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('image', files[0]);

    try {
      const res = await fetch('/admin/upload-image', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
        },
        body: formData,
      });

      const result = await res.json();
      if (result.url) {
        setCatImage(result.url);
        setSuccessMessage('Category image uploaded and converted to WebP successfully!');
      }
    } catch (err) {
      setErrorMessage('Failed to upload category image.');
    }

    setUploadingCatImage(false);
  };

  const handleDeleteCategorySubmit = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setErrorMessage(null);
      setSuccessMessage(null);

      router.delete(`/admin/categories/${id}`, {
        onSuccess: () => {
          setSuccessMessage('Category deleted successfully.');
        },
        onError: () => {
          setErrorMessage('Failed to delete category.');
        },
      });
    }
  };

  const handleAddBrandSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) {
      setErrorMessage('Brand name is required.');
      return;
    }

    setIsSubmittingBrand(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    router.post(
      '/admin/brands',
      {
        name: brandName.trim(),
        logo: brandLogo.trim() || brandName.trim().toUpperCase(),
      },
      {
        onSuccess: () => {
          setBrandName('');
          setBrandLogo('');
          setIsSubmittingBrand(false);
          setSuccessMessage('Brand created successfully!');
        },
        onError: (errors: any) => {
          setIsSubmittingBrand(false);
          setErrorMessage(Object.values(errors).flat().join(', ') || 'Failed to add brand.');
        },
      }
    );
  };

  const handleDeleteBrandSubmit = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete brand "${name}"?`)) {
      setErrorMessage(null);
      setSuccessMessage(null);

      router.delete(`/admin/brands/${id}`, {
        onSuccess: () => {
          setSuccessMessage('Brand deleted successfully.');
        },
        onError: () => {
          setErrorMessage('Failed to delete brand.');
        },
      });
    }
  };

  const handleAddPresetSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!presetName.trim()) {
      setErrorMessage('Equipment preset name is required.');
      return;
    }
    setIsSubmittingPreset(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    router.post('/admin/presets', {
      type: 'equipment',
      name: presetName.trim(),
      value: presetName.trim(),
      category: presetCategory.trim() || 'Specialized Equipment',
    }, {
      onSuccess: () => {
        setPresetName('');
        setIsSubmittingPreset(false);
        setSuccessMessage('New Equipment Preset created successfully!');
      },
      onError: () => {
        setIsSubmittingPreset(false);
        setErrorMessage('Failed to create Equipment Preset.');
      }
    });
  };

  const handleDeletePresetSubmit = (id: number) => {
    if (confirm('Are you sure you want to delete this equipment preset?')) {
      setErrorMessage(null);
      setSuccessMessage(null);
      router.delete(`/admin/presets/${id}`, {
        onSuccess: () => {
          setSuccessMessage('Equipment Preset deleted successfully.');
        }
      });
    }
  };

  // Image Upload File Handler with Automatic WebP Compression for Vehicles
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setErrorMessage(null);

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('image', files[i]);

      try {
        const res = await fetch('/admin/upload-image', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
          },
          body: formData,
        });

        const result = await res.json();
        if (result.url) {
          setImages((prev) => {
            const filtered = prev.filter((img) => img.trim() !== '');
            return [...filtered, result.url];
          });
        }
      } catch (err) {
        setErrorMessage('Failed to upload image. Please try again.');
      }
    }

    setUploadingImage(false);
    setSuccessMessage('Image uploaded and compressed to WebP format successfully!');
  };

  // Form State
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number>(2001);
  const [trim, setTrim] = useState('');
  const [price, setPrice] = useState<number>(45000);
  const [mileage, setMileage] = useState<number>(85000);
  const [vin, setVin] = useState('');
  const [engine, setEngine] = useState('');
  const [transmission, setTransmission] = useState<'Manual' | 'Automatic' | 'Semi-Automatic'>('Manual');
  const [fuelType, setFuelType] = useState<'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric'>('Gasoline');
  const [drivetrain, setDrivetrain] = useState<'RWD' | 'AWD' | '4WD' | 'FWD'>('RWD');
  const [bodyType, setBodyType] = useState<'Coupe' | 'Sedan' | 'SUV' | 'Hatchback' | 'Wagon'>('Coupe');
  const [exteriorColor, setExteriorColor] = useState('');
  const [interiorColor, setInteriorColor] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(false);

  // Dynamic Array States
  const [images, setImages] = useState<string[]>(['']);
  const [features, setFeatures] = useState<string[]>(['']);

  const handleAddImageField = () => setImages([...images, '']);
  const handleRemoveImageField = (index: number) => {
    if (images.length === 1) {
      setImages(['']);
    } else {
      setImages(images.filter((_, i) => i !== index));
    }
  };
  const handleImageChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const handleAddFeatureField = () => setFeatures([...features, '']);
  const handleRemoveFeatureField = (index: number) => {
    if (features.length === 1) {
      setFeatures(['']);
    } else {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };
  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const togglePresetFeature = (featureName: string) => {
    const cleaned = features.filter((f) => f.trim() !== '');
    if (cleaned.includes(featureName)) {
      const updated = cleaned.filter((f) => f !== featureName);
      setFeatures(updated.length > 0 ? updated : ['']);
    } else {
      setFeatures([...cleaned, featureName]);
    }
  };

  // Compute Equipment Presets
  const displayEquipmentPresets = presets && presets.filter(p => p.type === 'equipment' || p.type === 'feature').length > 0
    ? presets.filter(p => p.type === 'equipment' || p.type === 'feature')
    : PRESET_FEATURES.map(f => ({ id: 0, name: f, value: f, type: 'equipment' as const }));

  const resetForm = () => {
    setMake('');
    setModel('');
    setYear(2001);
    setTrim('');
    setPrice(45000);
    setMileage(85000);
    setVin('');
    setEngine('');
    setTransmission('Manual');
    setFuelType('Gasoline');
    setDrivetrain('RWD');
    setBodyType('Coupe');
    setExteriorColor('');
    setInteriorColor('');
    setDescription('');
    setFeatured(false);
    setImages(['']);
    setFeatures(['']);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!make.trim() || !model.trim() || !vin.trim() || !engine.trim() || !exteriorColor.trim() || !interiorColor.trim()) {
      setErrorMessage('Please fill in all required fields marked with an asterisk (*).');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const cleanedImages = images.map(img => img.trim()).filter(Boolean);
    const cleanedFeatures = features.map(feat => feat.trim()).filter(Boolean);

    if (cleanedImages.length === 0) {
      setErrorMessage('Please upload or provide at least one image URL.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    router.post('/admin/vehicles', {
      make: make.trim(),
      model: model.trim(),
      year,
      trim: trim.trim(),
      price,
      mileage,
      vin: vin.trim().toUpperCase(),
      engine: engine.trim(),
      transmission,
      fuelType,
      drivetrain,
      exteriorColor: exteriorColor.trim(),
      interiorColor: interiorColor.trim(),
      bodyType,
      images: cleanedImages,
      description: description.trim() || `Excellent imported ${year} ${make} ${model} finished in premium ${exteriorColor}. Hand-selected and ready for street registration.`,
      features: cleanedFeatures,
      featured
    }, {
      onSuccess: () => {
        setSuccessMessage(`Successfully published build to inventory: ${year} ${make} ${model}`);
        resetForm();
        setActiveTab('list');
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: (errs) => {
        console.error('Vehicle submission errors:', errs);
        const errorMsg = Object.values(errs).flat().join(' ') || 'Failed to save vehicle build. Ensure VIN is unique.';
        setErrorMessage(errorMsg);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  const handleDeleteVehicleSubmit = (vehId: string | number, name: string) => {
    if (confirm(`Are you absolutely sure you want to delete ${name} from active inventory? This operation cannot be undone.`)) {
      router.delete(`/admin/vehicles/${vehId}`, {
        onSuccess: () => {
          setSuccessMessage('Vehicle build deleted successfully.');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onError: () => {
          setErrorMessage('Failed to delete vehicle build.');
        }
      });
    }
  };

  const formattedCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-zinc-50 text-zinc-900 min-h-screen py-10 sm:py-16" id="admin-page-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="mb-10 flex flex-col justify-between items-start md:flex-row md:items-end gap-6 border-b border-zinc-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded border border-red-200/60 uppercase">
                DEALER UTILITY
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded">
                SECURE ADMINISTRATION
              </span>
            </div>
            <h1 className="font-sans text-3xl font-black tracking-tight text-zinc-900 uppercase sm:text-4xl md:text-5xl leading-none">
              Inventory Controls
            </h1>
            <p className="text-zinc-500 text-sm mt-2 uppercase font-semibold tracking-wide">
              Manage vehicle builds, categories, master equipment presets, and compressed media uploads.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/inventory"
              className="group inline-flex items-center space-x-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer border border-zinc-200 px-4 py-2.5 bg-white shadow-xs"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Inventory</span>
            </Link>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
              activeTab === 'list'
                ? 'bg-zinc-900 border-zinc-900 text-white shadow-sm'
                : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            Manage Active Inventory ({vehicles.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('add')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer flex items-center gap-2 ${
              activeTab === 'add'
                ? 'bg-red-600 border-red-600 text-white shadow-sm'
                : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Add New Import Build</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'bg-red-700 border-red-700 text-white shadow-sm'
                : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            <FolderPlus className="h-4 w-4" />
            <span>Manage Categories ({categories?.length || 0})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('brands')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer flex items-center gap-2 ${
              activeTab === 'brands'
                ? 'bg-[#cc0000] border-[#cc0000] text-white shadow-sm'
                : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            <Tag className="h-4 w-4" />
            <span>Manage Brands ({brands?.length || 0})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('masters')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer flex items-center gap-2 ${
              activeTab === 'masters'
                ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                : 'border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
          >
            <Sliders className="h-4 w-4 text-red-500" />
            <span>Equipment Presets ({displayEquipmentPresets.length})</span>
          </button>
        </div>

        {/* Success / Error Messages */}
        {successMessage && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 font-semibold mb-8 flex items-center gap-3 animate-fade-in shadow-xs">
            <Check className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800 font-semibold mb-8 flex items-center gap-3 animate-fade-in shadow-xs">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ── 1. List View with Pagination by 10 ── */}
        {activeTab === 'list' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white shadow-xs overflow-hidden">
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                <div>
                  <h2 className="font-sans text-lg font-extrabold uppercase tracking-wide text-zinc-900">
                    Active Catalog Stock ({vehicles.length} Units Available)
                  </h2>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">
                    Live inventory synchronized with site frontend. Paginated by 10 units per page.
                  </p>
                </div>
                <button
                  onClick={() => {
                    resetForm();
                    setActiveTab('add');
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Import Build</span>
                </button>
              </div>

              {vehicles.length === 0 ? (
                <div className="p-12 text-center">
                  <Car className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-zinc-700 uppercase">No active inventory records</h3>
                  <p className="text-xs text-zinc-500 mt-1">Get started by creating your first imported build profile.</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-zinc-700">
                      <thead className="bg-zinc-50 border-b border-zinc-200 uppercase font-extrabold text-[10px] tracking-wider text-zinc-500">
                        <tr>
                          <th className="py-3.5 px-6">Vehicle Profile</th>
                          <th className="py-3.5 px-6">VIN / Chassis</th>
                          <th className="py-3.5 px-6">Price</th>
                          <th className="py-3.5 px-6">Specs</th>
                          <th className="py-3.5 px-6">Status</th>
                          <th className="py-3.5 px-6 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 font-medium">
                        {paginatedVehicles.map((veh) => (
                          <tr key={veh.id} className="hover:bg-zinc-50/80 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-16 bg-zinc-100 border border-zinc-200 overflow-hidden shrink-0">
                                  <img
                                    src={veh.images && veh.images[0] ? veh.images[0] : '/assets/hero-image.jpg'}
                                    alt={`${veh.make} ${veh.model}`}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-extrabold text-zinc-900 text-sm uppercase">
                                    {veh.year} {veh.make} {veh.model}
                                  </h4>
                                  <p className="text-[11px] text-zinc-500 font-mono">{veh.trim || 'Standard Grade'}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 font-mono text-zinc-600 text-xs">
                              {veh.vin}
                            </td>
                            <td className="py-4 px-6 font-extrabold text-red-600 text-sm">
                              {formattedCurrency(veh.price)}
                            </td>
                            <td className="py-4 px-6 text-[11px] text-zinc-600 space-y-0.5">
                              <div>{veh.transmission} • {veh.drivetrain}</div>
                              <div className="text-zinc-400">{veh.mileage.toLocaleString()} miles</div>
                            </td>
                            <td className="py-4 px-6">
                              {veh.featured ? (
                                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                                  <Sparkles className="h-3 w-3 text-amber-600" /> Featured
                                </span>
                              ) : (
                                <span className="inline-block bg-zinc-100 text-zinc-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                                  Standard
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeleteVehicleSubmit(veh.id, `${veh.year} ${veh.make} ${veh.model}`)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all cursor-pointer"
                                title="Delete Stock Item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-zinc-500 font-medium">
                        Showing <span className="font-bold text-zinc-800">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-bold text-zinc-800">{Math.min(currentPage * ITEMS_PER_PAGE, vehicles.length)}</span> of <span className="font-bold text-zinc-800">{vehicles.length}</span> builds
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1.5 rounded border border-zinc-200 bg-white text-xs font-bold uppercase tracking-wider text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                              currentPage === page
                                ? 'bg-red-600 border border-red-600 text-white shadow-xs'
                                : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          type="button"
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1.5 rounded border border-zinc-200 bg-white text-xs font-bold uppercase tracking-wider text-zinc-700 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ── 2. Add New Vehicle Form ── */}
        {activeTab === 'add' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Core Identification */}
            <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-zinc-100 pb-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-red-50 text-red-600 border border-red-100 flex items-center justify-center">
                  <Car className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase text-zinc-900 tracking-wide">1. Vehicle Profile Identification</h3>
                  <p className="text-xs text-zinc-500 uppercase mt-0.5 font-medium">Manufacturer details, build designation and title metadata.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Make / Manufacturer <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nissan"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Model Line <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Skyline GT-R"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Production Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1970}
                    max={2030}
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value) || 2001)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Trim / Grade Package
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. V-Spec II Nür"
                    value={trim}
                    onChange={(e) => setTrim(e.target.value)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    VIN / Chassis Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BNR34-402910"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-mono font-medium focus:bg-white transition-colors uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Asking Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={100}
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Mileage (Miles) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={mileage}
                    onChange={(e) => setMileage(parseInt(e.target.value) || 0)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Body Style Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value as any)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Coupe">Coupe</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV / Truck</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Wagon">Wagon</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Technical Specifications */}
            <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-zinc-100 pb-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-red-50 text-red-600 border border-red-100 flex items-center justify-center">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase text-zinc-900 tracking-wide">2. Mechanical Engine & Drivetrain Configuration</h3>
                  <p className="text-xs text-zinc-500 uppercase mt-0.5 font-medium">Power plant, gear ratio type, paint code and chassis setup.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Engine Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2.6L RB26DETT Twin-Turbo I6"
                    value={engine}
                    onChange={(e) => setEngine(e.target.value)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Transmission Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value as any)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Manual">6-Speed Manual</option>
                    <option value="Automatic">5-Speed Automatic</option>
                    <option value="Semi-Automatic">Sequential Dual-Clutch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Drivetrain Architecture <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={drivetrain}
                    onChange={(e) => setDrivetrain(e.target.value as any)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="AWD">AWD (ATTESA E-TS)</option>
                    <option value="RWD">RWD (Rear Wheel Drive)</option>
                    <option value="4WD">4WD (Four Wheel Drive)</option>
                    <option value="FWD">FWD (Front Wheel Drive)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Exterior Paint Code / Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bayside Blue (TV2)"
                    value={exteriorColor}
                    onChange={(e) => setExteriorColor(e.target.value)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Interior Trim / Upholstery <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Black Alcantara & Recaro Cloth"
                    value={interiorColor}
                    onChange={(e) => setInteriorColor(e.target.value)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                    Fuel Supply System
                  </label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value as any)}
                    className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors cursor-pointer"
                  >
                    <option value="Gasoline">Gasoline (High Octane 93+)</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 bg-zinc-50 text-red-600 focus:ring-red-500 cursor-pointer"
                />
                <label htmlFor="featured-checkbox" className="text-xs font-bold uppercase tracking-wider text-zinc-600 cursor-pointer">
                  Promote to Homepage Carousel
                </label>
              </div>
            </div>

            {/* 3. Media & Compressed WebP Uploads */}
            <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-zinc-100 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-red-50 text-red-600 border border-red-100 flex items-center justify-center">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold uppercase text-zinc-900 tracking-wide">3. Media Registry & WebP Image Compressor</h3>
                    <p className="text-xs text-zinc-500 uppercase mt-0.5 font-medium">Upload local images for automatic WebP compression.</p>
                  </div>
                </div>
              </div>

              {/* Upload Drop Zone */}
              <div className="space-y-3">
                <span className="text-[10px] tracking-widest text-zinc-500 font-black uppercase block">
                  Direct Media Upload (Automatic WebP Converter Enabled)
                </span>
                <label className="border-2 border-dashed border-zinc-300 hover:border-red-500 bg-zinc-50 hover:bg-red-50/40 p-6 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all">
                  <UploadCloud className="h-8 w-8 text-red-600 mb-2 animate-bounce" />
                  <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                    {uploadingImage ? 'Processing & Compressing WebP Images...' : 'Click or Drag & Drop Vehicle Photos to Upload'}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium mt-1">
                    Supports JPG, PNG, GIF, WebP up to 10MB. Images are automatically converted to optimized WebP.
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Dynamic URLs list */}
              <div className="space-y-4">
                <label className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase block">Active Image URLs & Thumbnails</label>
                
                {images.map((img, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {img.trim() && (
                      <div className="h-10 w-14 bg-zinc-100 border border-zinc-200 shrink-0 overflow-hidden rounded">
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/... or /uploads/vehicles/..."
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-grow border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-mono focus:bg-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImageField(index)}
                      className="h-10 w-10 shrink-0 inline-flex items-center justify-center rounded-lg border border-zinc-200 hover:border-red-200 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove field"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddImageField}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 border border-zinc-200 bg-zinc-50 px-4 py-2.5 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Another Image Slot</span>
                </button>
              </div>
            </div>

            {/* 4. Description Narrative & Equipment features */}
            <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-zinc-100 pb-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-red-50 text-red-600 border border-red-100 flex items-center justify-center">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase text-zinc-900 tracking-wide">4. Specifications & Specialized Equipment Toggles</h3>
                  <p className="text-xs text-zinc-500 uppercase mt-0.5 font-medium">Click to toggle equipment presets on/off or add custom items.</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase block">Advisory Review / Sourcing Description</label>
                <textarea
                  rows={4}
                  placeholder="Provide an elegant technical review of this build, its Japanese pedigree, subframe diagnostic logs, or modifications if any..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-900 focus:outline-none focus:border-red-500 font-medium leading-relaxed focus:bg-white transition-colors"
                />
              </div>

              {/* Specialized Equipment Toggle Pills */}
              <div className="space-y-2.5 bg-zinc-50 border border-zinc-200 p-4 rounded-xl">
                <span className="text-[10px] tracking-widest text-zinc-500 font-extrabold uppercase flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-red-600" />
                  <span>Specialized Equipment Presets (Click to Toggle On/Off)</span>
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {displayEquipmentPresets.map((preset) => {
                    const isSelected = features.includes(preset.name);
                    return (
                      <button
                        key={preset.id || preset.name}
                        type="button"
                        onClick={() => togglePresetFeature(preset.name)}
                        className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 ${
                          isSelected
                            ? 'bg-red-600 border-red-600 text-white shadow-sm scale-105'
                            : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 hover:border-zinc-400'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <span>+</span>}
                        <span>{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic features list */}
              <div className="space-y-4">
                <label className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase block">Custom Specific Equipment List</label>

                {features.map((feat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="e.g. Original Recaro SR3 Seats or Brembo Performance Rotors"
                      value={feat}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-grow border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeatureField(index)}
                      className="h-10 w-10 shrink-0 inline-flex items-center justify-center rounded-lg border border-zinc-200 hover:border-red-200 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove Feature"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddFeatureField}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 border border-zinc-200 bg-zinc-50 px-4 py-2.5 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Custom Equipment Line</span>
                </button>
              </div>

            </div>

            {/* Save / Dispatch Actions */}
            <div className="flex justify-end gap-4 border-t border-zinc-200 pt-6">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setActiveTab('list');
                }}
                className="rounded-lg px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer border border-zinc-200 bg-white shadow-xs"
              >
                Cancel & Clear Form
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Publish Sourced Import</span>
              </button>
            </div>

          </form>
        )}

        {/* ── 3. Manage Categories Tab ── */}
        {activeTab === 'categories' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Column */}
              <div className="lg:col-span-5 bg-white border border-zinc-200 p-6 sm:p-8 shadow-xs rounded-xl">
                <div className="flex items-center space-x-2.5 border-b border-zinc-100 pb-4 mb-6">
                  <FolderPlus className="h-5 w-5 text-red-600" />
                  <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wide">
                    Add New Category
                  </h2>
                </div>

                <form onSubmit={handleAddCategorySubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SUV, SEDAN, ACCESSORIES, EXHAUSTS"
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      className="w-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Category Image Upload <span className="text-red-500">*</span>
                    </label>

                    {catImage ? (
                      <div className="relative border border-zinc-200 rounded-lg p-3 bg-zinc-50 flex items-center justify-between">
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img src={catImage} alt="Uploaded Category" className="h-12 w-16 object-cover rounded border border-zinc-200 shrink-0" />
                          <span className="text-xs font-mono text-zinc-600 truncate">{catImage}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCatImage('')}
                          className="text-xs font-bold text-red-600 hover:text-red-700 underline shrink-0 cursor-pointer ml-2"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-zinc-300 hover:border-red-500 bg-zinc-50 hover:bg-red-50/40 p-6 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all">
                        <UploadCloud className="h-7 w-7 text-red-600 mb-2 animate-bounce" />
                        <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                          {uploadingCatImage ? 'Uploading & Compressing...' : 'Click to Upload Category Cover Photo'}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-medium mt-1">
                          PNG, JPG, WebP format supported. Automatically compressed to WebP.
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCatFileUpload}
                          disabled={uploadingCatImage}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Target Link / Query URL
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /inventory?bodyType=SUV or /inventory?q=Bike"
                      value={catLink}
                      onChange={(e) => setCatLink(e.target.value)}
                      className="w-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingCat || uploadingCatImage}
                    className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Category</span>
                  </button>
                </form>
              </div>

              {/* Categories List Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white border border-zinc-200 p-6 shadow-xs rounded-xl">
                  <h2 className="text-base font-bold text-zinc-900 uppercase tracking-wide border-b border-zinc-100 pb-3 mb-4">
                    Active Categories Showcase ({categories?.length || 0})
                  </h2>

                  {(!categories || categories.length === 0) ? (
                    <p className="text-xs text-zinc-500 py-6 text-center italic">
                      No custom categories added yet. The home page will use default categories.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="border border-zinc-200 p-4 bg-zinc-50 flex flex-col justify-between hover:shadow-xs transition-shadow relative group rounded-lg"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-extrabold text-[#cc0000] text-lg uppercase tracking-wider">
                                {cat.name}
                              </h3>
                              <button
                                type="button"
                                onClick={() => handleDeleteCategorySubmit(cat.id)}
                                className="p-1 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                                title="Delete Category"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="w-full aspect-[16/9] bg-white border border-zinc-200 flex items-center justify-center p-2 mb-3 overflow-hidden rounded">
                              <img
                                src={cat.image || '/assets/cat-cars.png'}
                                alt={cat.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          </div>

                          <div className="pt-2 border-t border-zinc-200 text-[11px] font-mono text-zinc-500 truncate">
                            <span className="font-bold text-zinc-700">Link:</span> {cat.link || `/inventory?q=${cat.name}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Brand Management Section ── */}
        {activeTab === 'brands' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Add Brand Form */}
              <div className="lg:col-span-4 bg-white border border-zinc-200 p-6 sm:p-8 shadow-xs rounded-xl h-fit">
                <div className="flex items-center space-x-2.5 border-b border-zinc-100 pb-4 mb-6">
                  <Tag className="h-5 w-5 text-red-600" />
                  <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wide">
                    Add New Automobile Brand
                  </h2>
                </div>

                <form onSubmit={handleAddBrandSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Brand Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Porsche, Nissan, Toyota..."
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      required
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-xs font-semibold text-zinc-900 focus:bg-white focus:border-red-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Display Logo Text / Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. PORSCHE (Defaults to Name if blank)"
                      value={brandLogo}
                      onChange={(e) => setBrandLogo(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-xs font-semibold text-zinc-900 focus:bg-white focus:border-red-600 focus:outline-none"
                    />
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Text to display in the brand grid box on the Home page.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingBrand}
                    className="w-full bg-red-700 hover:bg-red-800 text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{isSubmittingBrand ? 'Saving Brand...' : 'Save Brand'}</span>
                  </button>
                </form>
              </div>

              {/* Brands Grid */}
              <div className="lg:col-span-8 bg-white border border-zinc-200 p-6 sm:p-8 shadow-xs rounded-xl">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wide">
                      Automobile Brands ({brands?.length || 0})
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      These brands appear in the brand bar on the home page.
                    </p>
                  </div>
                </div>

                {brands.length === 0 ? (
                  <div className="p-8 text-center bg-zinc-50 rounded-xl border border-zinc-200">
                    <p className="text-xs font-bold text-zinc-600">No custom brands added yet.</p>
                    <p className="text-[11px] text-zinc-400 mt-1">Add your first brand using the form on the left.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto pr-1">
                    {brands.map((b) => (
                      <div
                        key={b.id}
                        className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 flex items-center justify-between hover:border-red-300 transition-colors group"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="font-extrabold text-zinc-900 text-xs truncate">
                            {b.name}
                          </p>
                          <p className="text-[10px] font-mono text-red-600 uppercase font-bold truncate mt-0.5">
                            {b.logo || b.name}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteBrandSubmit(b.id, b.name)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors shrink-0 cursor-pointer"
                          title="Delete Brand"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── 4. Equipment Presets Master Page ── */}
        {activeTab === 'masters' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Add Equipment Preset Form */}
              <div className="lg:col-span-5 bg-white border border-zinc-200 p-6 sm:p-8 shadow-xs rounded-xl">
                <div className="flex items-center space-x-2.5 border-b border-zinc-100 pb-4 mb-6">
                  <Sliders className="h-5 w-5 text-red-600" />
                  <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-wide">
                    Add Equipment Preset
                  </h2>
                </div>

                <form onSubmit={handleAddPresetSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Equipment / Feature Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kakimoto Racing Exhaust, Ohlins Coilovers"
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      className="w-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                      Group Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Specialized Equipment, Performance, Interior"
                      value={presetCategory}
                      onChange={(e) => setPresetCategory(e.target.value)}
                      className="w-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-950 focus:outline-none focus:border-red-500 font-medium focus:bg-white transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingPreset}
                    className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider py-3.5 px-6 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Equipment Preset</span>
                  </button>
                </form>
              </div>

              {/* Display Equipment Presets Catalog */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white border border-zinc-200 p-6 shadow-xs rounded-xl">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wide flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-red-600" />
                      <span>Specialized Equipment Presets ({displayEquipmentPresets.length})</span>
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {displayEquipmentPresets.map((p) => (
                      <div
                        key={p.id || p.name}
                        className="inline-flex items-center space-x-2 bg-zinc-100 border border-zinc-200 px-3 py-2 rounded-lg text-xs font-bold text-zinc-800 hover:border-zinc-400 transition-colors"
                      >
                        <span>{p.name}</span>
                        {p.id > 0 && (
                          <button
                            type="button"
                            onClick={() => handleDeletePresetSubmit(p.id)}
                            className="text-zinc-400 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                            title="Delete Preset"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

AdminView.layout = (page: any) => <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}>{page}</AuthenticatedLayout>;
