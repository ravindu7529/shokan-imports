import PublicLayout from '../Components/PublicLayout';
import { useState, ChangeEvent, FormEvent } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  FileCheck2, 
  Truck, 
  Globe, 
  MessageSquare, 
  ArrowRight, 
  Zap, 
  CheckCircle2,
  ExternalLink,
  Car
} from 'lucide-react';

const WA_NUMBER = '12033976029';

const WA_ICON = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FAQS = [
  {
    q: 'How long does ocean shipping take from Japan to the US?',
    a: 'Ocean transit from Japan to the US East Coast (Port of Newark, NJ) typically takes 4–6 weeks. After clearing customs, we arrange inland enclosed transport to your door within 5–10 business days. The full door-to-door timeline from auction win to delivery is usually 8–12 weeks.',
    category: 'Logistics'
  },
  {
    q: 'What payment & deposit methods do you accept?',
    a: 'We accept domestic wire transfers, certified bank checks, and ACH. A 10% deposit holds an inventory vehicle or initiates a custom auction sourcing brief. Full payment is due prior to final vessel dispatch or vehicle release.',
    category: 'Payment'
  },
  {
    q: 'Are your imported vehicles 100% federally legal?',
    a: 'Yes. All our imported Japanese vehicles meet the US 25-Year Federal Exemption rule (DOT, EPA, & Customs Form 7501). Every car is sold with a clean Connecticut State Title and valid customs release paperwork ready for immediate registration in any US state.',
    category: 'Compliance'
  },
  {
    q: 'Can you source a specific vehicle directly from Japanese auctions?',
    a: 'Absolutely. We hold direct bidding credentials at USS Tokyo, HAA Kobe, JAA, and BayAuc. Tell us your target model, preferred year range, condition, and budget — our Tokyo team will inspect candidate cars in person before submitting bids.',
    category: 'Sourcing'
  },
];

const TOPICS = [
  { id: 'general', label: 'General Inquiry', desc: 'Questions about our services' },
  { id: 'vehicle_request', label: 'Custom Sourcing', desc: 'Find a specific model' },
  { id: 'inventory', label: 'Inventory Question', desc: 'Inquire about listed cars' },
  { id: 'shipping', label: 'Shipping & Customs', desc: 'Logistics & titling details' },
];

const SUGGESTED_CHASSIS = [
  'Nissan Skyline GT-R',
  'Toyota Supra',
  'Mazda RX-7',
  'Toyota Land Cruiser',
  'Subaru Impreza WRX STI',
  'Honda Civic Type R / NSX'
];

export default function ContactView() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    vehicleOfInterest: '',
    message: '',
  });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

  const handleTopicSelect = (topicId: string) => {
    setFormData(prev => ({ ...prev, subject: topicId }));
    if (formError) setFormError(null);
  };

  const handleChipClick = (chassis: string) => {
    setFormData(prev => ({
      ...prev,
      vehicleOfInterest: prev.vehicleOfInterest ? `${prev.vehicleOfInterest}, ${chassis}` : chassis,
      subject: prev.subject === 'general' ? 'vehicle_request' : prev.subject
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in your name, email, and message before sending.');
      return;
    }

    const selectedTopicLabel = TOPICS.find(t => t.id === formData.subject)?.label || formData.subject;
    const emailSubject = `Contact Inquiry — Shokan Imports [${selectedTopicLabel}]`;
    const emailBody = [
      `Topic: ${selectedTopicLabel}`,
      formData.vehicleOfInterest ? `Vehicle of Interest: ${formData.vehicleOfInterest}` : '',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone ? `Phone: ${formData.phone}` : '',
      '',
      'Message:',
      formData.message,
    ].filter(Boolean).join('\n');

    window.open(`mailto:tradeharborcars@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`, '_self');

    setFormSubmitted(true);
    setFormError(null);
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans" id="contact-page">

      {/* ── Page Hero Header ── */}
      <div className="relative overflow-hidden bg-[#0f172a] pt-28 pb-16 lg:pt-36 lg:pb-20 border-b border-slate-800" id="contact-hero">
        {/* Background Ambient Glow & Subtle Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-sky-600/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Live Advisor Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1.5 text-xs font-semibold text-red-400 backdrop-blur-md mb-4 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="tracking-wide uppercase text-[11px] font-bold">Advisors Online • East Coast &amp; Tokyo Hubs</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight">
              Let's Talk <strong className="font-bold text-red-600">Chassis &amp; Imports</strong>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-4 font-light max-w-2xl">
              Whether you're ready to secure an inventory vehicle, request a custom auction bid sheet from Japan, or discuss federal compliance — our specialist team is here.
            </p>

            {/* Quick Hero Highlights */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/80 border border-slate-700/60 text-red-500 shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Fast Turnaround</p>
                  <p className="text-[11px] text-slate-400">Response within 30 mins</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/80 border border-slate-700/60 text-red-500 shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Japan Direct Access</p>
                  <p className="text-[11px] text-slate-400">USS Tokyo &amp; HAA Kobe</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/80 border border-slate-700/60 text-red-500 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">100% US Legal</p>
                  <p className="text-[11px] text-slate-400">Title &amp; Customs Cleared</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Main Section: Form & Direct Touchpoints ── */}
      <section className="mx-auto max-w-[1280px] px-6 py-12 lg:py-16 lg:px-8" id="contact-section">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-12 items-start">

          {/* ── LEFT: Interactive Contact / Sourcing Panel ── */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-200/80 relative" id="contact-form-panel">
            <div className="mb-8 border-b border-slate-100 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" /> Direct Inquiry Form
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Fields marked * are required</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tracking-tight">
                Send a Message or Sourcing Brief
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Select a topic below. Submitting will pre-fill your structured inquiry directly into your email client for rapid advisor routing.
              </p>
            </div>

            {formError && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-3">
                <span className="font-bold shrink-0">⚠️</span>
                <div>{formError}</div>
              </div>
            )}

            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Topic Pills Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Select Inquiry Topic *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {TOPICS.map((t) => {
                      const isSelected = formData.subject === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleTopicSelect(t.id)}
                          className={`p-3 text-left rounded-xl border transition-all text-xs font-medium ${
                            isSelected
                              ? 'border-red-600 bg-red-50/50 text-red-900 ring-2 ring-red-600/20 shadow-sm'
                              : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-slate-100/50'
                          }`}
                        >
                          <div className={`font-bold ${isSelected ? 'text-red-700' : 'text-slate-900'}`}>{t.label}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 leading-tight truncate">{t.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Marcus Vance"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                    />
                  </div>
                </div>

                {/* Phone + Vehicle of Interest */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(203) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Vehicle of Interest (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="vehicleOfInterest"
                        placeholder="e.g. 1999 Skyline GT-R R34"
                        value={formData.vehicleOfInterest}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all"
                      />
                      <Car className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Chassis Chips Helper */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Popular Sourcing Targets (Click to Add):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_CHASSIS.map((chassis) => (
                      <button
                        key={chassis}
                        type="button"
                        onClick={() => handleChipClick(chassis)}
                        className="rounded-lg border border-slate-200 bg-slate-100/70 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all"
                      >
                        + {chassis}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Message / Specifications *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us what you need — target budget, mileage limit, grade requirements, shipping timeline, or titling questions..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/30 p-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Form Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-7 py-3.5 shadow-lg shadow-red-600/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    id="contact-submit-btn"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Send Inquiry via Email</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="text-center sm:text-right">
                    <p className="text-[11px] text-slate-400">
                      Prefer direct email? Write us at <a href="mailto:tradeharborcars@gmail.com" className="text-slate-700 font-semibold underline hover:text-red-600">tradeharborcars@gmail.com</a>
                    </p>
                  </div>
                </div>

              </form>
            ) : (
              <div className="py-12 px-4 text-center space-y-5" id="contact-success">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Email Client Opened!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been formatted and passed to your default email client. Click send to submit the message to <strong>tradeharborcars@gmail.com</strong>.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => { setFormSubmitted(false); setFormData(p => ({ ...p, message: '', vehicleOfInterest: '' })); }}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg px-4 py-2 hover:border-slate-300 transition-all"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Direct Touchpoints & HQ Cards ── */}
          <div className="space-y-6" id="contact-info-panel">

            {/* VIP WhatsApp Speed Card */}
            <div className="rounded-2xl bg-[#0f172a] text-white p-6 shadow-xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> Fastest Connect
                </span>
                <span className="text-[10px] text-slate-400 font-mono">24/7 Desk</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">Instant Advisor Chat</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                Skip form queues. Chat live with our vehicle import concierges in Connecticut or Tokyo for real-time inventory updates and auction access.
              </p>

              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white text-xs font-bold py-3 px-4 hover:bg-[#1ebe5c] shadow-lg shadow-emerald-950/40 transition-all"
                id="whatsapp-direct-btn"
              >
                <WA_ICON className="h-4 w-4" />
                Message WhatsApp Line
              </a>
            </div>

            {/* HQ & Showroom Cards */}
            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-600" /> Direct Touchpoints
                </h4>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">USA &amp; Japan</span>
              </div>

              {/* Phone */}
              <a href="tel:+12033976029" className="flex items-start gap-3.5 group p-2.5 rounded-xl hover:bg-slate-50 transition-all">
                <div className="h-9 w-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Phone / Text</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">(203) 397-6029</p>
                  <p className="text-[11px] text-slate-400">Mon–Sat 9:00am – 6:00pm ET</p>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:tradeharborcars@gmail.com" className="flex items-start gap-3.5 group p-2.5 rounded-xl hover:bg-slate-50 transition-all">
                <div className="h-9 w-9 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-all">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Official Email</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">tradeharborcars@gmail.com</p>
                  <p className="text-[11px] text-slate-400">Quotes &amp; Title Documentation</p>
                </div>
              </a>

              {/* Physical Location */}
              <div className="flex items-start gap-3.5 p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                <div className="h-9 w-9 rounded-lg bg-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Showroom &amp; Storage</p>
                  <p className="text-xs font-bold text-slate-800">New Haven, Connecticut, USA</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Tokyo Auction Presence: USS Tokyo / HAA Kobe</p>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-800 mb-2">
                <Clock className="h-4 w-4 text-red-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Business Hours (ET)</h4>
              </div>
              <div className="space-y-2 text-xs divide-y divide-slate-100">
                {[
                  { day: 'Monday – Friday', hours: '9:00 am – 6:00 pm' },
                  { day: 'Saturday', hours: '10:00 am – 5:00 pm' },
                  { day: 'Sunday', hours: 'Closed (By Appointment)' },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between pt-2 first:pt-0">
                    <span className="text-slate-500 font-medium">{day}</span>
                    <span className={`font-semibold ${hours.includes('Closed') ? 'text-red-500' : 'text-slate-800'}`}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Assurance Card */}
            <div className="rounded-2xl bg-slate-100/80 p-5 border border-slate-200/60 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Shokan Guarantee</span>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>150-Point Pre-Export Inspection</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Clean US Title &amp; DOT Clearance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Enclosed Nationwide Door Delivery</span>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Follow &amp; Connect</span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.facebook.com/p/Sh%C5%8Dkan-Imports-61579354299132/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all"
                >
                  <svg className="h-4 w-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </a>

                <a
                  href="https://www.instagram.com/shokan_imports?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-pink-50 hover:text-pink-700 hover:border-pink-200 transition-all"
                >
                  <svg className="h-4 w-4 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── Interactive Location & Showroom Map ── */}
      <section className="bg-white border-t border-slate-200/80 py-16" id="map-section">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-1">HQ &amp; Facility Location</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Connecticut Showroom &amp; Port Facility
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Located conveniently in New Haven, CT with direct rail and port access to Port Newark, NJ. Visits by scheduled appointment.
              </p>
            </div>
            <div>
              <a
                href="https://maps.google.com/?q=New+Haven,+CT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl px-4 py-2.5 transition-all"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-md relative" id="map-embed">
            <iframe
              title="Shokan Imports Location — Connecticut"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96017.79665785607!2d-72.98408!3d41.3082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d8443a8070d5%3A0xbaf0e1c07d72523d!2sNew%20Haven%2C%20CT!5e0!3m2!1sen!2sus!4v1720000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(30%) contrast(1.05)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ── Interactive FAQ Accordion Section ── */}
      <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-8 border-t border-slate-200/80" id="faq-section">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-1">Common Questions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Need immediate clarification on ocean freight schedules, import taxes, or auction grading rules? Browse quick answers below.
            </p>
            <div className="mt-6">
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                <span>Ask custom question on WhatsApp</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-4" id="faq-list">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  id={`faq-${i}`}
                  className={`rounded-2xl border transition-all ${
                    isOpen ? 'border-red-200 bg-white shadow-md' : 'border-slate-200/80 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 shrink-0">
                        {faq.category}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                        {faq.q}
                      </span>
                    </div>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

ContactView.layout = (page: any) => <PublicLayout currentPage="contact">{page}</PublicLayout>;
