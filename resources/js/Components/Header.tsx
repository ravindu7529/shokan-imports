import { useState, useEffect, useRef } from 'react';
import { Search, Mail, PhoneCall, Clock, Menu, X, Loader2, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Vehicle } from '../types';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

interface HeaderProps {
  currentPage: string;
}

export default function Header({ currentPage }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Live Search fetching
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults([]);
      setIsLoading(false);
      setIsSearchOpen(false);
      return;
    }

    setIsLoading(true);
    setIsSearchOpen(true);

    const timer = setTimeout(() => {
      fetch(`/api/vehicles/search?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(Array.isArray(data) ? data : []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Search error:', err);
          setSearchResults([]);
          setIsLoading(false);
        });
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Click outside listener for search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setIsMobileSearchVisible(false);
      window.location.href = `/inventory?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const navCategories = [
    { label: 'CARS', value: 'cars', route: '/inventory?bodyType=Sedan' },
    { label: 'TRUCKS', value: 'trucks', route: '/inventory?bodyType=SUV' },
  ];

  const navLinks = [
    { label: 'HOME', route: '/', id: 'home' },
    ...navCategories.map((c) => ({ label: c.label, route: c.route, id: c.value })),
    { label: 'ALL INVENTORY', route: '/inventory', id: 'inventory' },
    { label: 'ABOUT', route: '/about', id: 'about' },
    { label: 'CONTACT', route: '/contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-md transition-all font-sans" id="site-header">
      {/* ── Top Utility Info Bar ── */}
      <div className="bg-[#eeeeee] border-b border-slate-300 text-slate-700 text-xs py-1 px-3 sm:px-4">
        <div className="mx-auto max-w-[1140px] flex items-center justify-between gap-2">
          {/* Left Side: Business Info */}
          <div className="flex items-center space-x-2 sm:space-x-4 text-[11px] font-medium text-slate-700 overflow-x-auto no-scrollbar whitespace-nowrap">
            <div className="flex items-center space-x-1.5 shrink-0">
              <Clock className="h-3.5 w-3.5 text-red-700" />
              <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
            </div>
            <span className="text-slate-300 hidden md:inline">|</span>
            <a href="mailto:tradeharborcars@gmail.com" className="hidden md:flex items-center space-x-1.5 hover:text-red-700 transition-colors shrink-0">
              <Mail className="h-3.5 w-3.5 text-red-700" />
              <span>tradeharborcars@gmail.com</span>
            </a>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <a href="tel:+12033976029" className="flex items-center space-x-1.5 hover:text-red-700 transition-colors shrink-0">
              <PhoneCall className="h-3.5 w-3.5 text-red-700" />
              <span>+1 203-397-6029</span>
            </a>
          </div>

          {/* Right Side: Compliance Badge */}
          <div className="hidden lg:flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
            <span>U.S. Federal Compliant Importer</span>
          </div>
        </div>
      </div>

      {/* ── Desktop Main Banner Header (>= md) ── */}
      <div className="hidden md:flex w-full border-b border-red-950 shadow-inner overflow-hidden">
        {/* Left ~60% Red Section (Logo) */}
        <div className="w-[62%] bg-gradient-to-r from-[#b30000] via-[#c90000] to-[#990000] text-white py-2.5 px-6 sm:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <img
              src="/assets/shokan-logo1.jpeg"
              alt="Shokan Imports"
              className="h-10 w-auto object-contain rounded bg-white p-0.5 shadow-sm transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* WhatsApp Button Section */}
        <div className="w-[19%] bg-[#1c2026] text-white py-2.5 px-4 flex items-center justify-center border-l border-slate-700/60 shadow-md">
          <a
            href="https://wa.me/12033976029"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-3 py-1.5 text-xs font-black uppercase tracking-wider shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center space-x-1.5 whitespace-nowrap"
            id="header-whatsapp-btn"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 text-white fill-current" />
            <span>WHATSAPP NOW</span>
          </a>
        </div>

        {/* Contact Us Button Section */}
        <div className="w-[19%] bg-[#252a30] text-white py-2.5 px-4 flex items-center justify-center border-l border-slate-700/60 shadow-md">
          <Link
            href="/contact"
            className="bg-white hover:bg-slate-100 text-slate-900 px-3 py-1.5 text-xs font-black uppercase tracking-wider shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center space-x-1.5 whitespace-nowrap"
            id="header-contact-btn"
          >
            <Mail className="h-3.5 w-3.5 text-[#b30000]" />
            <span>CONTACT US</span>
          </Link>
        </div>
      </div>

      {/* ── Mobile Banner Header (< md) ── */}
      <div className="md:hidden w-full bg-gradient-to-r from-[#b30000] via-[#c90000] to-[#990000] border-b border-red-950 px-4 py-2.5 flex items-center justify-between shadow-md">
        {/* Shokan Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/assets/shokan-logo1.jpeg"
            alt="Shokan Imports"
            className="h-9 w-auto object-contain rounded bg-white p-0.5 shadow-sm"
          />
        </Link>

        {/* Action Controls Cluster */}
        <div className="flex items-center space-x-2">
          {/* Quick Search Toggle */}
          <button
            onClick={() => setIsMobileSearchVisible(!isMobileSearchVisible)}
            className="p-2 text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors active:scale-95 cursor-pointer"
            aria-label="Toggle Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Quick Call */}
          <a
            href="tel:+12033976029"
            className="p-2 text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors active:scale-95"
            aria-label="Call Us"
          >
            <PhoneCall className="h-4 w-4" />
          </a>

          {/* WhatsApp Direct Icon */}
          <a
            href="https://wa.me/12033976029"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white bg-[#25D366] hover:bg-[#20ba5a] rounded-full shadow-sm transition-transform active:scale-95"
            aria-label="WhatsApp Us"
          >
            <WhatsAppIcon className="h-4 w-4 fill-current text-white" />
          </a>

          {/* Mobile Drawer Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white bg-black/40 hover:bg-black/60 rounded-lg transition-colors border border-white/20 ml-1 active:scale-95 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Inline Search Bar (Toggled) ── */}
      {isMobileSearchVisible && (
        <div className="md:hidden bg-slate-900 border-b border-slate-700 p-3 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search inventory by make, model, year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
              />
              {isLoading && (
                <Loader2 className="absolute right-3 top-2.5 h-4 w-4 text-red-500 animate-spin pointer-events-none" />
              )}
            </div>
            <button
              type="submit"
              className="bg-red-700 text-white px-4 py-2 text-xs font-bold rounded-lg hover:bg-red-800 transition-colors shrink-0"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* ── Desktop Main Navigation Bar (>= md) ── */}
      <div className="bg-white border-b border-slate-300 shadow-xs">
        <div className="mx-auto max-w-[1140px] flex items-center justify-between">
          <nav className="hidden md:flex items-center">
            <Link
              href="/"
              className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider border-r border-slate-200 transition-colors ${
                currentPage === 'home' ? 'text-red-700 bg-slate-50' : 'text-slate-800 hover:text-red-700 hover:bg-slate-50'
              }`}
            >
              HOME
            </Link>
            {navCategories.map((cat) => (
              <Link
                key={cat.value}
                href={cat.route}
                className="px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-800 border-r border-slate-200 hover:text-red-700 hover:bg-slate-50 transition-colors"
              >
                {cat.label}
              </Link>
            ))}
            <Link
              href="/inventory"
              className={`px-6 py-3 text-xs font-extrabold uppercase tracking-wider border-r border-slate-200 transition-colors ${
                currentPage === 'inventory' ? 'text-red-700 bg-slate-50' : 'text-slate-800 hover:text-red-700 hover:bg-slate-50'
              }`}
            >
              ALL INVENTORY
            </Link>
            <Link
              href="/about"
              className={`px-6 py-3 text-xs font-extrabold uppercase tracking-wider border-r border-slate-200 transition-colors ${
                currentPage === 'about' ? 'text-red-700 bg-slate-50' : 'text-slate-800 hover:text-red-700 hover:bg-slate-50'
              }`}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className={`px-6 py-3 text-xs font-extrabold uppercase tracking-wider transition-colors ${
                currentPage === 'contact' ? 'text-red-700 bg-slate-50' : 'text-slate-800 hover:text-red-700 hover:bg-slate-50'
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Desktop Live Search Container */}
          <div ref={searchContainerRef} className="relative my-1.5 mr-2 md:mr-0 ml-auto md:ml-0 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.trim().length > 0) setIsSearchOpen(true);
                  }}
                  className="bg-slate-50 border border-slate-300 border-r-0 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-red-600 w-44 sm:w-64 transition-colors"
                />
                {isLoading && (
                  <Loader2 className="absolute right-2 h-3.5 w-3.5 text-red-600 animate-spin pointer-events-none" />
                )}
              </div>
              <button
                type="submit"
                className="bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 text-slate-600 hover:text-red-700 transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Live Search Results Dropdown */}
            {isSearchOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-80 sm:w-96 bg-white border border-slate-300 shadow-2xl rounded-lg overflow-hidden z-50">
                <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <span>
                    {isLoading
                      ? 'Searching vehicles...'
                      : searchResults.length > 0
                      ? `${searchResults.length} Matching ${searchResults.length === 1 ? 'Vehicle' : 'Vehicles'}`
                      : 'Search Results'}
                  </span>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {isLoading ? (
                    <div className="p-6 text-center text-xs text-slate-400 space-y-2">
                      <Loader2 className="h-5 w-5 animate-spin mx-auto text-red-600" />
                      <p>Searching inventory...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((car) => (
                      <Link
                        key={car.id}
                        href={`/inventory/${car.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2.5 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="h-12 w-16 bg-slate-100 rounded overflow-hidden shrink-0 border border-slate-200">
                          <img
                            src={car.images?.[0] || '/assets/cat-cars.png'}
                            alt={`${car.year} ${car.make} ${car.model}`}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-red-700 transition-colors">
                            {car.year} {car.make} {car.model} {car.trim ? `(${car.trim})` : ''}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] mt-0.5">
                            <span className="font-extrabold text-red-600">
                              ${Number(car.price).toLocaleString()}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-500">
                              {Number(car.mileage).toLocaleString()} mi
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-500">
                      <p className="font-semibold text-slate-700">No vehicles match "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Modern Slide-Over Mobile Drawer Menu (< md) ── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-[85%] max-w-[340px] bg-slate-900 text-white h-full flex flex-col shadow-2xl z-10 overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                  src="/assets/shokan-logo1.jpeg"
                  alt="Shokan Imports"
                  className="h-8 w-auto object-contain rounded bg-white p-0.5"
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Embedded Drawer Live Search */}
            <div className="p-4 bg-slate-900 border-b border-slate-800">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                {isLoading && (
                  <Loader2 className="absolute right-3 top-2.5 h-4 w-4 text-red-500 animate-spin" />
                )}
              </form>

              {/* Mobile Live Results Box */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="mt-2 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden max-h-52 overflow-y-auto divide-y divide-slate-700">
                  {searchResults.map((car) => (
                    <Link
                      key={car.id}
                      href={`/inventory/${car.id}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2.5 p-2 hover:bg-slate-700 transition-colors"
                    >
                      <img
                        src={car.images?.[0] || '/assets/cat-cars.png'}
                        alt={car.model}
                        className="h-9 w-12 object-cover rounded bg-slate-900"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold text-white truncate">
                          {car.year} {car.make} {car.model}
                        </p>
                        <p className="text-[10px] font-extrabold text-red-400">
                          ${Number(car.price).toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="p-4 grid grid-cols-2 gap-2 border-b border-slate-800">
              <a
                href="https://wa.me/12033976029"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white py-2 px-3 rounded-lg text-center font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-transform active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4 fill-current text-white" />
                <span>WhatsApp</span>
              </a>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-red-700 hover:bg-red-800 text-white py-2 px-3 rounded-lg text-center font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-transform active:scale-95"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Us</span>
              </Link>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id || (link.id === 'home' && currentPage === 'home');
                return (
                  <Link
                    key={link.label}
                    href={link.route}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                      isActive
                        ? 'bg-red-700/20 text-red-400 border-l-4 border-red-600 pl-3.5'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`h-4 w-4 ${isActive ? 'text-red-400' : 'text-slate-600'}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer Contact Info */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 text-slate-400 text-[11px] space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-3.5 w-3.5 text-red-500 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </div>
              <a href="tel:+12033976029" className="flex items-center space-x-2 hover:text-white transition-colors">
                <PhoneCall className="h-3.5 w-3.5 text-red-500 shrink-0" />
                <span>+1 203-397-6029</span>
              </a>
              <a href="mailto:tradeharborcars@gmail.com" className="flex items-center space-x-2 hover:text-white transition-colors truncate">
                <Mail className="h-3.5 w-3.5 text-red-500 shrink-0" />
                <span className="truncate">tradeharborcars@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
