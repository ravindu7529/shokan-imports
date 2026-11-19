import PublicLayout from '../Components/PublicLayout';
import { Link } from '@inertiajs/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  FileCheck, 
  Truck, 
  Ship, 
  Users, 
  Search,
  Gavel,
  BadgeCheck
} from 'lucide-react';

export default function AboutView() {
  const processSteps = [
    {
      step: '01',
      title: 'Find & Inspect',
      desc: 'We locate your desired vehicle in Japan and conduct a comprehensive on-site mechanical and body inspection before bidding.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Direct Auction Bidding',
      desc: 'We bid directly at Japan’s premier auto auctions (USS, HAA Kobe) without any broker markups or hidden fees.',
      icon: Gavel,
    },
    {
      step: '03',
      title: 'Safe Ocean Shipping',
      desc: 'Your vehicle is secured into containerized ocean transport and shipped safely from Japan directly to the U.S. port.',
      icon: Ship,
    },
    {
      step: '04',
      title: 'Customs & Compliance',
      desc: 'We take care of all U.S. Customs clearance, EPA emissions forms, and DOT 25-year import documentation.',
      icon: FileCheck,
    },
    {
      step: '05',
      title: 'Title & Delivery',
      desc: 'Your car is fully serviced, granted a clean state title, and delivered directly to your doorstep or ready for pickup.',
      icon: Truck,
    },
  ];

  const stats = [
    { value: '12+', label: 'Years Experience', sub: 'Established 2012' },
    { value: '100%', label: 'Federal Legal', sub: '25-Year DOT & EPA Compliant' },
    { value: 'Direct', label: 'Japan Bidding', sub: 'No Middleman Markups' },
    { value: 'Clean', label: 'State Titles', sub: 'Ready for Registration' },
  ];

  const team = [
    {
      name: 'Daisuke Sato',
      role: 'Japan Inspection Lead (Tokyo)',
      bio: 'Based in Tokyo with over 15 years of vehicle assessment experience. Daisuke inspects chassis condition, engine health, and body integrity before any auction bid.',
    },
    {
      name: 'Ray Ravindu',
      role: 'Director of Sourcing & Logistics',
      bio: 'Oversees container shipping, U.S. Customs clearance, EPA/DOT filing, and state titling to ensure every import is 100% legal and hassle-free.',
    },
    {
      name: 'Marcus Miller',
      role: 'Head Service Technician',
      bio: 'Handles pre-delivery servicing, fluid flushes, mechanical tuning, and road testing so your car is ready to drive immediately upon delivery.',
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans" id="about-page">

      {/* ── Page Header ── */}
      <div className="relative bg-[#0f172a] py-14 sm:py-18 border-b border-slate-800" id="about-hero">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-block bg-red-600/20 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              About Shokan Imports
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Bringing Quality Vehicles Directly from Japan to America.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3 font-normal max-w-2xl">
              Since 2012, Shokan Imports has made acquiring imported vehicles simple, transparent, and 100% legal. We handle everything from Tokyo auction sourcing to U.S. Customs titling.
            </p>
          </div>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <section className="bg-white border-b border-slate-200 py-6 shadow-xs" id="about-stats-banner">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-0.5">
                <p className="text-2xl sm:text-3xl font-black text-[#b30000] tracking-tight">{stat.value}</p>
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">{stat.label}</p>
                <p className="text-[11px] text-slate-500">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 py-12 space-y-12">

        {/* ── Featured Image Showcase ── */}
        <div className="relative overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-900" id="about-image-banner">
          <div className="aspect-[21/9] w-full overflow-hidden">
            <img
              src="/assets/img4.jpg"
              alt="Shokan Imports Sourcing Facility"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Direct Sourcing Presence in Japan</h3>
              <p className="text-xs text-slate-300">Hands-on vehicle evaluations at major Tokyo and Kansai auctions.</p>
            </div>
          </div>
        </div>

        {/* ── Our Story Section (Clean & Simple) ── */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs" id="our-story-section">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1.5 h-5 bg-[#b30000]" />
            <h2 className="font-extrabold text-slate-900 text-lg uppercase tracking-wide">
              Who We Are
            </h2>
          </div>

          <div className="space-y-3.5 text-sm text-slate-600 leading-relaxed max-w-4xl">
            <p className="text-base text-slate-800 font-medium leading-relaxed">
              Shokan Imports was established to eliminate the guesswork and anxiety from buying vehicles imported directly from Japan.
            </p>
            <p>
              Too often, buyers purchase vehicles sight-unseen from overseas, facing surprise fees, questionable mileage records, or complicated customs paperwork. We created Shokan to provide a straightforward, honest import service backed by real physical inspections in Japan and complete legal clearance in the United States.
            </p>
            <p>
              Whether you are looking for a sports car, a rugged 4x4 truck, an SUV, or a classic sedan, our team manages the entire journey from auction bidding to door delivery.
            </p>
          </div>
        </section>

        {/* ── Simple 5-Step Import Process ── */}
        <section id="import-process-section">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-5 bg-[#b30000]" />
                <h2 className="font-extrabold text-slate-900 text-lg uppercase tracking-wide">
                  How Importing Works (Simple 5-Step Process)
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1 pl-3.5">
                We handle the complex paperwork, logistics, and legal filings so you can enjoy your vehicle stress-free.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {processSteps.map((item) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={item.step} 
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-red-400 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded font-mono">
                        STEP {item.step}
                      </span>
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                        <IconComp className="h-4 w-4" />
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Why Choose Us Guarantees ── */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs" id="why-choose-us-section">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-1.5 h-5 bg-[#b30000]" />
            <h2 className="font-extrabold text-slate-900 text-lg uppercase tracking-wide">
              Why Enthusiasts Trust Shokan Imports
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0 mt-0.5">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Guaranteed Genuine Mileage</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Every vehicle undergoes odometer history verification in Japan to guarantee authentic mileage prior to export.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0 mt-0.5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">100% Federal Legal (25-Year Rule)</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Full clearance through U.S. Customs (CBP 7501), EPA emissions, and DOT regulations.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0 mt-0.5">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Clean State Title Delivered</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  You receive a clean state title with every vehicle, making DMV registration smooth and hassle-free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Team Section ── */}
        <section id="team-section">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-1.5 h-5 bg-[#b30000]" />
            <h2 className="font-extrabold text-slate-900 text-lg uppercase tracking-wide">
              Our Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div 
                key={member.name} 
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mb-3">
                    <Users className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">{member.role}</p>
                  
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Simple CTA Band ── */}
        <div className="rounded-xl bg-[#0f172a] text-white p-8 shadow-md border border-slate-800 flex flex-col md:flex-row gap-6 items-center justify-between" id="about-cta">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Looking for a specific vehicle imported from Japan?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Browse our ready-to-drive inventory or contact us for custom auction sourcing.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 bg-[#b30000] hover:bg-red-600 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded shadow-sm transition-colors"
            >
              <span>View Inventory</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded shadow-sm transition-colors"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

AboutView.layout = (page: any) => <PublicLayout currentPage="about">{page}</PublicLayout>;
