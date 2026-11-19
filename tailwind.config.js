import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                display: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                mono: ['IBM Plex Mono', 'monospace'],
            },
            colors: {
                'cream': '#F8FAFC',
                'slate-inspect': '#64748B',
            },
        },
    },

    plugins: [forms],
};
