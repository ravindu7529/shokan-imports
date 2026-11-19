import { useRef } from 'react';
import PublicLayout from '../Components/PublicLayout';
import { Link } from '@inertiajs/react';
import { Vehicle, Category, Brand } from '../types';
import Hero from '../Components/Hero';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HomeViewProps {
  vehicles: Vehicle[];
  categories?: Category[];
  brands?: Brand[];
}

export default function HomeView({ vehicles, categories = [], brands = [] }: HomeViewProps) {
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Default fallback brand logos list
  const defaultBrandLogos: Brand[] = [
    { id: 1, name: 'Acura', logo: 'ACURA' },
    { id: 2, name: 'Aston Martin', logo: 'ASTON MARTIN' },
    { id: 3, name: 'Audi', logo: 'AUDI' },
    { id: 4, name: 'Cadillac', logo: 'CADILLAC' },
    { id: 5, name: 'Dodge', logo: 'DODGE' },
    { id: 6, name: 'Fiat', logo: 'FIAT' },
    { id: 7, name: 'Ford', logo: 'FORD' },
    { id: 8, name: 'Honda', logo: 'HONDA' },
    { id: 9, name: 'Hyundai', logo: 'HYUNDAI' },
    { id: 10, name: 'Isuzu', logo: 'ISUZU' },
    { id: 11, name: 'Kia', logo: 'KIA' },
    { id: 12, name: 'Land Rover', logo: 'LAND ROVER' },
    { id: 13, name: 'Lexus', logo: 'LEXUS' },
    { id: 14, name: 'Lotus', logo: 'LOTUS' },
    { id: 15, name: 'Mercedes-Benz', logo: 'MERCEDES' },
    { id: 16, name: 'Mitsubishi', logo: 'MITSUBISHI' },
    { id: 17, name: 'Nissan', logo: 'NISSAN' },
    { id: 18, name: 'Peugeot', logo: 'PEUGEOT' },
    { id: 19, name: 'Mini', logo: 'MINI' },
    { id: 20, name: 'Subaru', logo: 'SUBARU' },
  ];

  const displayBrands = brands && brands.length > 0 ? brands : defaultBrandLogos;

  // Default fallback categories
  const defaultCategories: Category[] = [
    { id: 1, name: 'CARS', image: '/assets/cat-cars.png', link: '/inventory?bodyType=Sedan' },
    { id: 2, name: 'BIKES', image: '/assets/cat-bikes.png', link: '/inventory?q=Bike' },
    { id: 3, name: 'TRUCKS', image: '/assets/cat-trucks.png', link: '/inventory?bodyType=SUV' },
    { id: 4, name: 'PARTS', image: '/assets/cat-parts.png', link: '/inventory?q=Parts' },
  ];

  const displayCategories = categories && categories.length > 0 ? categories : defaultCategories;

  const scrollCategoriesLeft = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollCategoriesRight = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Default product fallback list if vehicles are fewer than 8
  const defaultProducts = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet conse ctetur',
      price: '$58.966',
      image: '/assets/hero-image.jpg',
    },
    {
      id: 2,
      title: 'Excepteur sint occaecat cupidatat non proident',
      price: '$58.966',
      image: '/assets/img1.jpg',
    },
    {
      id: 3,
      title: 'Ipsum dolor sit amet conse ctetur',
      price: '$58.966',
      image: '/assets/img-2.jpg',
    },
    {
      id: 4,
      title: 'Sunt in culpa qui',
      price: '$58.966',
      image: '/assets/img3.jpg',
    },
    {
      id: 5,
      title: 'Sit amet conse ctetur',
      price: '$58.966',
      image: '/assets/img4.jpg',
    },
    {
      id: 6,
      title: 'Lorem ipsum dolo',
      price: '$58.966',
      image: '/assets/img5.jpg',
    },
    {
      id: 7,
      title: 'Dolor sit amet conse ctetur',
      price: '$58.966',
      image: '/assets/hero-image.jpg',
    },
    {
      id: 8,
      title: 'Excepteur sint occaecat',
      price: '$58.966',
      image: '/assets/img1.jpg',
    },
  ];

  // Map inventory vehicles to 8 product items
  const productList = vehicles.length >= 8 
    ? vehicles.slice(0, 8).map((v) => ({
        id: v.id,
        title: `${v.year} ${v.make} ${v.model} ${v.trim || ''}`.trim(),
        price: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v.price),
        image: v.images[0] || '/assets/hero-image.jpg',
      }))
    : defaultProducts;

  return (
    <div className="bg-[#f5f5f7] text-slate-800 font-sans min-h-screen">
      {/* ── 1. Hero Slider ── */}
      <Hero />

      <div className="mx-auto max-w-[1140px] px-4 space-y-8 pb-16">
        {/* ── 2. Dynamic Categories Showcase Grid & Slider ── */}
        <section id="categories-section" className="bg-white border border-slate-300 p-4 shadow-2xs relative group">
          {displayCategories.length > 4 ? (
            <div className="relative">
              <div className="flex items-center justify-between mb-3 px-1 border-b border-slate-100 pb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-5 bg-[#cc0000]" />
                  <h3 className="font-extrabold text-[#cc0000] text-sm tracking-wider uppercase">
                    CATEGORIES
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={scrollCategoriesLeft}
                    className="p-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    aria-label="Slide Left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={scrollCategoriesRight}
                    className="p-1.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    aria-label="Slide Right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                ref={categoryScrollRef}
                className="flex items-center gap-4 overflow-x-auto scroll-smooth py-1 px-0.5"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {displayCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.link || `/inventory?q=${encodeURIComponent(cat.name)}`}
                    className="group/item flex-none w-[230px] sm:w-[250px] md:w-[260px] flex flex-col items-center text-center p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all hover:shadow-sm"
                  >
                    <h3 className="font-extrabold text-[#cc0000] text-xl tracking-wider uppercase mb-2 group-hover/item:scale-105 transition-transform">
                      {cat.name}
                    </h3>
                    <div className="w-full aspect-[16/9] flex items-center justify-center overflow-hidden">
                      <img
                        src={cat.image || '/assets/cat-cars.png'}
                        alt={`${cat.name} Category`}
                        className="max-h-full max-w-full object-contain group-hover/item:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {displayCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.link || `/inventory?q=${encodeURIComponent(cat.name)}`}
                  className="group flex flex-col items-center text-center p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all hover:shadow-sm"
                >
                  <h3 className="font-extrabold text-[#cc0000] text-xl tracking-wider uppercase mb-2 group-hover:scale-105 transition-transform">
                    {cat.name}
                  </h3>
                  <div className="w-full aspect-[16/9] flex items-center justify-center overflow-hidden">
                    <img
                      src={cat.image || '/assets/cat-cars.png'}
                      alt={`${cat.name} Category`}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── 3. Automobile Brand Logos Grid ── */}
        <section id="brands-section" className="bg-white border border-slate-300 p-4 shadow-2xs">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-2">
            {displayBrands.map((b) => (
              <Link
                key={b.id || b.name}
                href={`/inventory?make=${encodeURIComponent(b.name)}`}
                className="flex items-center justify-center p-2 border border-slate-200 bg-slate-50 hover:bg-red-50 hover:border-red-300 text-[10px] font-bold text-slate-600 hover:text-[#cc0000] text-center transition-all h-12 rounded-2xs"
                title={b.name}
              >
                <span>{b.logo || b.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 4. NEWEST ADDITION Section ── */}
        <section id="new-products-section">
          {/* Section Header */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1.5 h-6 bg-[#cc0000]" />
            <h2 className="font-extrabold text-[#cc0000] text-xl uppercase tracking-wide">
              NEWEST ADDITION
            </h2>
          </div>

          {/* Product Grid (4 columns x 2 rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productList.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-300 p-3 flex flex-col justify-between hover:shadow-md transition-shadow group"
                id={`product-card-${item.id}`}
              >
                {/* Product Photo Box */}
                <div className="border border-slate-200 bg-slate-100 overflow-hidden mb-3 aspect-[4/3] flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title */}
                <div className="min-h-[38px] mb-3">
                  <h3 className="text-xs font-semibold text-slate-700 leading-snug line-clamp-2 hover:text-[#cc0000] transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Price & Details Button */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
                  <span className="font-extrabold text-[#cc0000] text-sm">
                    {item.price}
                  </span>

                  <Link
                    href={`/inventory/${item.id}`}
                    className="bg-[#eeeeee] hover:bg-slate-300 border border-slate-300 text-slate-700 text-[10px] font-bold uppercase px-3 py-1 transition-colors"
                  >
                    DETAILS
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

HomeView.layout = (page: any) => <PublicLayout currentPage="home">{page}</PublicLayout>;
