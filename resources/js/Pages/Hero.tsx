import { Link } from '@inertiajs/react';
import { ArrowRight, Sparkles, Shield, Compass } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-[#0f172a] pb-20 pt-28 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44" id="hero-section">
      {/* Background Graphic with Crisp Image Visibility */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-image.jpg"
          alt="Premium Imported Car Background"
          className="h-full w-full object-cover opacity-70 object-center scale-100 filter contrast-105 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-[#0f172a]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-8">
          {/* Tagline Pill */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-red-500/30 bg-red-950/30 px-4 py-1.5 text-[0.85rem] font-semibold uppercase tracking-[2px] text-red-400 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-red-500" />
            <span>Curating Automotive History</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="font-display text-[34px] sm:text-[48px] lg:text-[60px] font-light tracking-tight text-white leading-tight break-words overflow-wrap-break-word">
              Discover Premium <br />
              <strong className="font-bold text-red-600">Imported Vehicles</strong>
            </h1>
            <p className="max-w-2xl text-base text-slate-300 sm:text-lg leading-relaxed font-light">
              Experience quality vehicles imported directly from Japan. Shokan Imports provides hand-sourced, federally legal cars, trucks, and performance vehicles, fully certified and ready for American roads.
            </p>
          </div>

          {/* Buttons CTA */}
          <div className="flex flex-col gap-4 sm:flex-row pt-2">
            <Link
              href="/inventory"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-4 text-sm font-bold tracking-wider uppercase text-white shadow-xl shadow-red-900/30 transition-all hover:bg-red-700 hover:-translate-y-0.5 active:translate-y-0"
              id="hero-cta-browse"
            >
              <span>Browse Inventory</span>
              <ArrowRight className="ml-2.5 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="glass-btn inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-bold tracking-wider uppercase text-white shadow-lg"
              id="hero-cta-contact"
            >
              <span>Contact Showroom</span>
            </Link>
          </div>

          {/* Core Trust Indicators */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-2xl">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/60 border border-slate-700/60">
                <Shield className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Federal Legal</h4>
                <p className="text-[11px] text-slate-400">NHTSA, DOT, & EPA compliant.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/60 border border-slate-700/60">
                <Compass className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Sourcing</h4>
                <p className="text-[11px] text-slate-400">Inspected directly in Japan.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/60 border border-slate-700/60">
                <Sparkles className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pristine Grading</h4>
                <p className="text-[11px] text-slate-400">Strict Auction Grade 4, 4.5, A.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

