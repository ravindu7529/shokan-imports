import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Admin Log In" />

            <div className="mb-6 text-center space-y-1">
                <h1 className="font-sans text-xl font-extrabold uppercase tracking-tight text-slate-900">
                    Admin Portal Log In
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                    Enter your authorized credentials to manage showroom inventory.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 p-3 rounded border border-emerald-200 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                {/* Email Address */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="email">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail className="h-4 w-4" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full bg-slate-50 border border-slate-300 text-slate-900 pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium transition-colors placeholder:text-slate-400 rounded-md"
                            autoComplete="username"
                            required
                            placeholder="name@shokanimports.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5 text-xs text-red-600" />
                </div>

                {/* Password */}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700" htmlFor="password">
                            Password
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[11px] font-semibold text-slate-500 hover:text-red-700 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Lock className="h-4 w-4" />
                        </div>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="w-full bg-slate-50 border border-slate-300 text-slate-900 pl-10 pr-10 py-2.5 text-xs focus:outline-none focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 font-medium transition-colors placeholder:text-slate-400 rounded-md"
                            autoComplete="current-password"
                            required
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1.5 text-xs text-red-600" />
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData(
                                    'remember',
                                    (e.target.checked || false) as false,
                                )
                            }
                        />
                        <span className="ms-2 text-xs font-medium text-slate-600">
                            Remember me on this device
                        </span>
                    </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex items-center justify-center space-x-2 bg-[#b30000] hover:bg-red-700 text-white text-xs font-extrabold uppercase tracking-wider py-3 px-6 rounded-md shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
                    >
                        <LogIn className="w-4 h-4" />
                        <span>LOG IN TO DASHBOARD</span>
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
