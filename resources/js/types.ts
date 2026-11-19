export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileage: number;
  vin: string;
  engine: string;
  transmission: 'Manual' | 'Automatic' | 'Semi-Automatic';
  fuelType: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric';
  drivetrain: 'RWD' | 'AWD' | '4WD' | 'FWD';
  exteriorColor: string;
  interiorColor: string;
  bodyType: 'Coupe' | 'Sedan' | 'SUV' | 'Hatchback' | 'Wagon';
  images: string[];
  description: string;
  features: string[];
  featured?: boolean;
}

export interface Category {
  id: number;
  name: string;
  image?: string;
  link?: string;
  order?: number;
}

export interface Brand {
  id: number;
  name: string;
  logo?: string;
  order?: number;
}

export interface Preset {
  id: number;
  type: 'feature' | 'image' | 'equipment';
  name: string;
  value?: string;
  category?: string;
  is_active?: boolean;
}

export type PageView = 'home' | 'inventory' | 'vehicle-details' | 'about' | 'contact' | 'admin';

export interface FilterState {
  search: string;
  make: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  mileageMax: string;
  bodyType: string;
  transmission: string;
  fuelType: string;
}
