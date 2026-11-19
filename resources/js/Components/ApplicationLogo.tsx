import { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="/assets/shokan-logo1.jpeg"
            alt="Shokan Imports Logo"
            className={`object-contain rounded bg-white p-0.5 shadow-sm ${props.className || 'h-9 w-auto'}`}
        />
    );
}
