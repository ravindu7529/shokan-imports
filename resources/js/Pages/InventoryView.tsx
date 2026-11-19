import PublicLayout from '../Components/PublicLayout';
import { Link } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import { Vehicle, FilterState } from '../types';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface InventoryViewProps {
  vehicles: Vehicle[];
  selectedMakeFilter?: string;
}

const INITIAL_FILTER_STATE: FilterState = {
  search: '',
  make: '',
  model: '',
  yearMin: '',
  yearMax: '',
  priceMin: '',
  priceMax: '',
  mileageMax: '',
  bodyType: '',
  transmission: '',
  fuelType: ''
};

export default function InventoryView({ vehicles, selectedMakeFilter }: InventoryViewProps) {
  const [filters, setFilters] = useState<FilterState>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return {
        search: params.get('q') || '',
        make: params.get('make') || selectedMakeFilter || '',
        model: params.get('model') || '',
        yearMin: params.get('yearMin') || '',
        yearMax: params.get('yearMax') || '',
        priceMin: params.get('priceMin') || '',
        priceMax: params.get('priceMax') || '',
        mileageMax: params.get('mileageMax') || '',
        bodyType: params.get('bodyType') || '',
        transmission: params.get('transmission') || '',
        fuelType: params.get('fuelType') || '',
      };
    }
    return { ...INITIAL_FILTER_STATE, make: selectedMakeFilter || '' };
  });

  const [sortOption, setSortOption] = useState<string>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (selectedMakeFilter !== undefined) {
      setFilters(prev => ({ ...prev, make: selectedMakeFilter }));
    }
  }, [selectedMakeFilter]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'make') setFilters(prev => ({ ...prev, make: value, model: '' }));
  };

  const handleResetFilters = () => setFilters(INITIAL_FILTER_STATE);

  const uniqueMakes = useMemo(() => Array.from(new Set(vehicles.map(v => v.make))).sort(), [vehicles]);
  const uniqueModels = useMemo(() => {
    const filtered = filters.make ? vehicles.filter(v => v.make === filters.make) : vehicles;
    return Array.from(new Set(filtered.map(v => v.model))).sort();
  }, [filters.make, vehicles]);
  const uniqueBodyTypes = useMemo(() => Array.from(new Set(vehicles.map(v => v.bodyType))).sort(), [vehicles]);
  const uniqueTransmissions = useMemo(() => Array.from(new Set(vehicles.map(v => v.transmission))).sort(), [vehicles]);

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];
    const q = filters.search.toLowerCase().trim();
    if (q) result = result.filter(v =>
      [v.make, v.model, v.trim, v.engine, v.description].some(s => s.toLowerCase().includes(q))
    );
    if (filters.make) result = result.filter(v => v.make === filters.make);
    if (filters.model) result = result.filter(v => v.model === filters.model);
    if (filters.yearMin) result = result.filter(v => v.year >= parseInt(filters.yearMin));
    if (filters.yearMax) result = result.filter(v => v.year <= parseInt(filters.yearMax));
    if (filters.priceMin) result = result.filter(v => v.price >= parseInt(filters.priceMin));
    if (filters.priceMax) result = result.filter(v => v.price <= parseInt(filters.priceMax));
    if (filters.mileageMax) result = result.filter(v => v.mileage <= parseInt(filters.mileageMax));
    if (filters.bodyType) result = result.filter(v => v.bodyType === filters.bodyType);
    if (filters.transmission) result = result.filter(v => v.transmission === filters.transmission);
    if (filters.fuelType) result = result.filter(v => v.fuelType === filters.fuelType);

    switch (sortOption) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'mileage-asc': result.sort((a, b) => a.mileage - b.mileage); break;
      case 'year-desc': result.sort((a, b) => b.year - a.year); break;
      default:
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.make.localeCompare(b.make);
        });
    }
    return result;
  }, [filters, sortOption, vehicles]);

  const formattedPrice = (p: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);
  const formattedMileage = (m: number) => m.toLocaleString('en-US') + ' mi';

  const activeFilterCount = Object.entries(filters).filter(([k, v]) => v && k !== 'search').length;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">Search</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Make, model, engine..."
            value={filters.search}
            onChange={e => handleFilterChange('search', e.target.value)}
            className="w-full border-b border-zinc-200 bg-transparent pb-2 pl-5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-700 transition-colors"
          />
          <Search className="absolute left-0 bottom-2.5 h-3.5 w-3.5 text-zinc-400" />
        </div>
      </div>

      {/* Make */}
      <div>
        <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">Make</label>
        <select
          value={filters.make}
          onChange={e => handleFilterChange('make', e.target.value)}
          className="w-full border-b border-zinc-200 bg-transparent pb-2 text-sm text-zinc-700 focus:outline-none focus:border-zinc-700 transition-colors cursor-pointer"
        >
          <option value="">All makes</option>
          {uniqueMakes.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Model */}
      <div>
        <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">Model</label>
        <select
          value={filters.model}
          onChange={e => handleFilterChange('model', e.target.value)}
          disabled={!filters.make}
          className="w-full border-b border-zinc-200 bg-transparent pb-2 text-sm text-zinc-700 focus:outline-none focus:border-zinc-700 transition-colors cursor-pointer disabled:opacity-40"
        >
          <option value="">{filters.make ? 'All models' : 'Select make first'}</option>
          {uniqueModels.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">Price range</label>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" placeholder="Min" value={filters.priceMin}
            onChange={e => handleFilterChange('priceMin', e.target.value)}
            className="border-b border-zinc-200 bg-transparent pb-2 text-sm text-zinc-700 focus:outline-none focus:border-zinc-700 placeholder-zinc-400 w-full transition-colors" />
          <input type="number" placeholder="Max" value={filters.priceMax}
            onChange={e => handleFilterChange('priceMax', e.target.value)}
            className="border-b border-zinc-200 bg-transparent pb-2 text-sm text-zinc-700 focus:outline-none focus:border-zinc-700 placeholder-zinc-400 w-full transition-colors" />
        </div>
      </div>

      {/* Mileage */}
      <div>
        <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">Max mileage</label>
        <select
          value={filters.mileageMax}
          onChange={e => handleFilterChange('mileageMax', e.target.value)}
          className="w-full border-b border-zinc-200 bg-transparent pb-2 text-sm text-zinc-700 focus:outline-none focus:border-zinc-700 transition-colors cursor-pointer"
        >
          <option value="">Any mileage</option>
          <option value="50000">Under 50,000 mi</option>
          <option value="75000">Under 75,000 mi</option>
          <option value="100000">Under 100,000 mi</option>
          <option value="120000">Under 120,000 mi</option>
        </select>
      </div>

      {/* Year */}
      <div>
        <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">Year range</label>
        <div className="grid grid-cols-2 gap-3">
          <select value={filters.yearMin} onChange={e => handleFilterChange('yearMin', e.target.value)}
            className="border-b border-zinc-200 bg-transparent pb-2 text-sm text-zinc-700 focus:outline-none focus:border-zinc-700 cursor-pointer transition-colors w-full">
            <option value="">From</option>
            {Array.from({ length: 15 }, (_, i) => 1990 + i).map(yr => <option key={yr} value={yr}>{yr}</option>)}
          </select>
          <select value={filters.yearMax} onChange={e => handleFilterChange('yearMax', e.target.value)}
            className="border-b border-zinc-200 bg-transparent pb-2 text-sm text-zinc-700 focus:outline-none focus:border-zinc-700 cursor-pointer transition-colors w-full">
            <option value="">To</option>
            {Array.from({ length: 15 }, (_, i) => 1990 + i).map(yr => <option key={yr} value={yr}>{yr}</option>)}
          </select>
        </div>
      </div>

      {/* Body Type */}
      <div>
        <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">Body type</label>
        <div className="flex flex-wrap gap-2">
          {uniqueBodyTypes.map(type => (
            <button
              key={type}
              onClick={() => handleFilterChange('bodyType', filters.bodyType === type ? '' : type)}
              className={`px-3 py-1.5 text-xs transition-colors border ${filters.bodyType === type
                  ? 'bg-zinc-900 border-zinc-900 text-white'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400'
                }`}
            >{type}</button>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <label className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-2">Transmission</label>
        <div className="grid grid-cols-2 gap-2">
          {uniqueTransmissions.map(trans => (
            <button
              key={trans}
              onClick={() => handleFilterChange('transmission', filters.transmission === trans ? '' : trans)}
              className={`py-2 text-xs transition-colors border ${filters.transmission === trans
                  ? 'bg-zinc-900 border-zinc-900 text-white'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400'
                }`}
            >{trans}</button>
          ))}
        </div>
      </div>

      <button
        onClick={handleResetFilters}
        className="w-full py-2 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen" id="inventory-page">
      <div className="mx-auto max-w-[1280px] px-6 py-10 pt-28 lg:px-8">

        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200/80 pb-6" id="inventory-header">
          <div className="section-header mb-0">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600 block mb-2">Live Collection</span>
            <h1 className="font-display text-3xl sm:text-4xl font-light text-slate-900 leading-tight">
              Import <strong className="font-bold text-red-600">Inventory</strong>
            </h1>
            <p className="section-subtext text-slate-500 text-sm mt-2">
              {filteredVehicles.length} of {vehicles.length} vehicles
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-4 py-2 text-sm border border-zinc-200 text-zinc-600 hover:border-zinc-400 transition-colors"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-zinc-900 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <select
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
              className="border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 focus:outline-none focus:border-zinc-400 cursor-pointer"
              id="inventory-sort"
            >
              <option value="featured">Featured first</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="mileage-asc">Lowest mileage</option>
              <option value="year-desc">Newest first</option>
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0" id="desktop-filters">
            <FilterPanel />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" id="listings-grid">
                {filteredVehicles.map((vehicle) => (
                  <a
                    key={vehicle.id}
                    href={`/inventory/${vehicle.id}`}
                    className="group flex flex-col overflow-hidden border border-zinc-100 bg-white hover:border-zinc-300 transition-colors duration-200"
                    id={`vehicle-card-${vehicle.id}`}
                  >
                    <div className="relative overflow-hidden bg-zinc-100 aspect-[16/10]">
                      <img
                        src={vehicle.images[0]}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {vehicle.featured && (
                        <span className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 p-4">
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <div className="min-w-0 pr-1">
                          <h2 className="font-semibold text-zinc-900 text-sm leading-snug group-hover:text-red-600 transition-colors truncate">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h2>
                          <p className="text-xs text-zinc-400 mt-0.5 truncate">{vehicle.trim}</p>
                        </div>
                        <span className="text-sm font-bold text-zinc-900 shrink-0 tabular-nums">
                          {formattedPrice(vehicle.price)}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-500 mt-auto pt-3 border-t border-zinc-50">
                        {vehicle.engine} &nbsp;·&nbsp; {vehicle.drivetrain} &nbsp;·&nbsp; {formattedMileage(vehicle.mileage)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-20" id="no-results-panel">
                <p className="text-zinc-400 text-sm">No vehicles match your filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-sm text-zinc-700 underline hover:text-zinc-900 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto" id="mobile-filter-overlay">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 sticky top-0 bg-white z-10">
            <p className="text-sm font-medium text-zinc-900">Filters</p>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-1 text-zinc-500 hover:text-zinc-900">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="px-6 py-6 space-y-6 pb-24">
            <FilterPanel />
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-6 py-4">
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full bg-zinc-900 text-white py-3 text-sm font-medium"
            >
              Show {filteredVehicles.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

InventoryView.layout = (page: any) => <PublicLayout currentPage="inventory">{page}</PublicLayout>;
