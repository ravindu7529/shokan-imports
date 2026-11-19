import PublicLayout from '../Components/PublicLayout';
import { useState } from 'react';
import { Vehicle } from '../types';
import { ArrowLeft, Check, Mail, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';

const WA_NUMBER = '12033976029';

const WA_ICON = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface VehicleDetailsViewProps {
  vehicle: Vehicle | null;
}

export default function VehicleDetailsView({ vehicle }: VehicleDetailsViewProps) {
  if (!vehicle) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-zinc-900">No vehicle found</h3>
          <p className="text-sm text-zinc-500">Return to the catalogue to select an import.</p>
          <Link href="/inventory" className="inline-block mt-4 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition-colors">
            Back to inventory
          </Link>
        </div>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(vehicle.images[0]);

  const formattedPrice = (p: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);
  const formattedMileage = (m: number) => m.toLocaleString('en-US') + ' mi';

  // Pre-built WhatsApp message with full vehicle context
  const buildWaUrl = () => {
    const lines = [
      `\uD83D\uDE97 *Vehicle Inquiry \u2014 Shokan Imports*`,
      ``,
      `*Vehicle:* ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      `*Trim:* ${vehicle.trim}`,
      `*Chassis / VIN:* ${vehicle.vin}`,
      `*Engine:* ${vehicle.engine}`,
      `*Drivetrain:* ${vehicle.drivetrain}`,
      `*Mileage:* ${formattedMileage(vehicle.mileage)}`,
      `*Asking Price:* ${formattedPrice(vehicle.price)}`,
      ``,
      `Hi, I\u2019m interested in this vehicle. Could you provide more details on availability?`,
    ];
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const specs = [
    { label: 'Year', value: vehicle.year.toString() },
    { label: 'Make', value: vehicle.make },
    { label: 'Model', value: vehicle.model },
    { label: 'Trim', value: vehicle.trim },
    { label: 'Mileage', value: formattedMileage(vehicle.mileage) },
    { label: 'VIN', value: vehicle.vin },
    { label: 'Engine', value: vehicle.engine },
    { label: 'Transmission', value: vehicle.transmission },
    { label: 'Fuel type', value: vehicle.fuelType },
    { label: 'Drivetrain', value: vehicle.drivetrain },
    { label: 'Exterior color', value: vehicle.exteriorColor },
    { label: 'Interior color', value: vehicle.interiorColor },
    { label: 'Body type', value: vehicle.bodyType },
  ];

  return (
    <div className="bg-white text-zinc-900 min-h-screen" id="vehicle-detail-page">
      <div className="mx-auto max-w-7xl px-6 py-10 pt-28 lg:px-8">

        {/* Back */}
        <Link
          href="/inventory"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-900 transition-colors mb-8 group uppercase tracking-wide"
          id="back-btn"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
          Back to inventory
        </Link>

        {/* Title row */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-zinc-100">
          <div>
            <h1 className="section-heading section-heading--small mb-0">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-sm text-zinc-400 mt-1.5">{vehicle.trim} &middot; {vehicle.year}</p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p className="text-[10px] text-zinc-400 uppercase tracking-wide mb-1">Asking price</p>
            <span className="text-2xl font-bold text-zinc-900 tabular-nums">
              {formattedPrice(vehicle.price)}
            </span>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-10" id="detail-main">

            {/* Gallery */}
            <div className="space-y-2" id="gallery">
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                <img
                  src={activeImage}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {vehicle.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {vehicle.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative aspect-[16/10] overflow-hidden transition-all ${
                        activeImage === img ? 'ring-2 ring-zinc-800' : 'opacity-50 hover:opacity-80'
                      }`}
                      id={`thumb-${idx}`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="space-y-4" id="description-block">
              <h2 className="section-heading section-heading--small text-sm font-semibold uppercase tracking-wide">Vehicle Overview</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">{vehicle.description}</p>
              <div className="border-l-2 border-zinc-200 pl-4 text-xs text-zinc-500 leading-relaxed py-1">
                <strong className="text-zinc-700 font-semibold">25-Year Federal Exemption:</strong>{' '}
                This chassis satisfies all NHTSA and EPA import standards. Includes original export certificate, CBP Form 7501, and a clean state title — 50-state registerable.
              </div>
            </div>

            {/* Technical specs */}
            <div id="specs-block">
              <h2 className="section-heading section-heading--small text-sm font-semibold uppercase tracking-wide mb-4">Technical Specifications</h2>
              <div className="divide-y divide-zinc-50 border border-zinc-100 overflow-hidden">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center px-4 py-3 odd:bg-zinc-50/50">
                    <span className="text-zinc-400 text-xs">{spec.label}</span>
                    <span className="text-zinc-800 text-xs font-medium text-right max-w-[200px] truncate" title={spec.value}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {vehicle.features.length > 0 && (
              <div id="features-block">
                <h2 className="section-heading section-heading--small text-sm font-semibold uppercase tracking-wide mb-4">Features & Equipment</h2>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {vehicle.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-xs text-zinc-600">
                      <Check className="h-3.5 w-3.5 text-red-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4" id="detail-sidebar">

            {/* WhatsApp inquiry button */}
            <div className="border border-zinc-100 p-6 space-y-4" id="enquiry-panel">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-0.5">Interested in this vehicle?</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Message us on WhatsApp — vehicle details are pre-filled for you.
                </p>
              </div>

              <a
                href={buildWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold text-sm py-3 transition-colors"
                id="whatsapp-inquiry-btn"
              >
                <WA_ICON />
                Inquire on WhatsApp
              </a>

              <p className="text-[10px] text-zinc-400 text-center leading-relaxed">
                Opens WhatsApp with this vehicle's details pre-filled. We typically respond within a few hours.
              </p>
            </div>

            {/* Direct contact */}
            <div className="border border-zinc-100 p-5 space-y-3">
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wide">Direct contact</p>
              <a href="tel:+12033976029" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                <Phone className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                +1 203-397-6029
              </a>
              <a href="mailto:tradeharborcars@gmail.com" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                <Mail className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                tradeharborcars@gmail.com
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

VehicleDetailsView.layout = (page: any) => <PublicLayout currentPage="inventory">{page}</PublicLayout>;
