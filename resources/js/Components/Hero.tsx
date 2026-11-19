import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from 'lucide-react';

const heroImages = [
  {
    id: 1,
    url: '/assets/hero-image.jpg',
    alt: 'Shokan Imports Featured Vehicle 1',
  },
  {
    id: 2,
    url: '/assets/img1.jpg',
    alt: 'Shokan Imports Featured Vehicle 2',
  },
  {
    id: 3,
    url: '/assets/img-2.jpg',
    alt: 'Shokan Imports Featured Vehicle 3',
  },
  {
    id: 4,
    url: '/assets/img3.jpg',
    alt: 'Shokan Imports Featured Vehicle 4',
  },
  {
    id: 5,
    url: '/assets/img4.jpg',
    alt: 'Shokan Imports Featured Vehicle 5',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="w-full bg-slate-900 border-b border-slate-300 overflow-hidden mb-8 h-[80vh] min-h-[500px]" id="hero-section">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Image Carousel Showcase */}
        <div className="lg:col-span-7 xl:col-span-8 relative bg-slate-950 flex items-center justify-center overflow-hidden h-[50vh] lg:h-full group">
          {heroImages.map((img, idx) => (
            <div
              key={img.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/40 pointer-events-none" />
            </div>
          ))}

          {/* Carousel Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-all opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-7 bg-red-600' : 'w-2.5 bg-white/60 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Red Details & Business Info Container */}
        <div className="lg:col-span-5 xl:col-span-4 bg-gradient-to-b from-[#cc0000] via-[#b30000] to-[#880000] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-center h-[40vh] lg:h-full relative shadow-xl z-20 overflow-y-auto">
          <div className="space-y-3 sm:space-y-4 my-auto">
            {/* Badge */}
            <div className="inline-block">
              <span className="inline-block bg-white/20 border border-white/30 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-2xs shadow-sm">
                SHOKAN IMPORTS
              </span>
            </div>

            {/* Header */}
            <h1 className="font-sans text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight uppercase leading-snug drop-shadow-sm">
              PREMIUM AUTOMOTIVE IMPORTS
            </h1>

            {/* Business Paragraph */}
            <p className="text-xs sm:text-sm text-red-50/90 leading-relaxed font-normal max-w-xl">
              Hand-sourcing pristine vehicles directly from Japan. 100% federally legal, fully certified, and ready for true enthusiasts.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <Link
                href="/inventory"
                className="flex-1 inline-flex items-center justify-center bg-white hover:bg-slate-100 text-[#cc0000] text-xs sm:text-sm font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-none shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] group text-center"
                id="hero-view-inventory-btn"
              >
                <span>VIEW INVENTORY</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="flex-1 inline-flex items-center justify-center bg-black/40 hover:bg-black/60 border border-white/40 hover:border-white text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider px-6 py-3.5 rounded-none shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] group text-center"
                id="hero-contact-us-btn"
              >
                <span>CONTACT US</span>
                <Phone className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
