import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="relative min-h-screen w-full bg-slate-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-red-600 selection:text-white">
            {/* Subtle Light Vehicle Backdrop Image */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-15">
                <img
                    src="/assets/hero-image.jpg"
                    alt="Shokan Imports Background"
                    className="w-full h-full object-cover filter brightness-110 contrast-100 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-slate-100/90 to-slate-100/70" />
            </div>

            {/* Content Box Container */}
            <div className="relative z-10 w-full max-w-md space-y-6">
                {/* Brand Header */}
                <div className="flex flex-col items-center text-center space-y-3">
                    <Link href="/" className="group flex items-center space-x-3 transition-transform hover:scale-105">
                        <img
                            src="/assets/shokan-logo1.jpeg"
                            alt="Shokan Imports Logo"
                            className="h-12 w-auto object-contain rounded bg-white p-1.5 shadow-md border border-slate-200"
                        />
                    </Link>
                    <div className="inline-flex items-center space-x-1.5 bg-red-50 border border-red-200 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-red-700 shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                        <span>Authorized Dealer Access</span>
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white border border-slate-200 p-8 shadow-xl rounded-xl text-slate-900">
                    {children}
                </div>

                {/* Back Link */}
                <div className="text-center pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-red-700 transition-colors group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Return to Showroom</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
