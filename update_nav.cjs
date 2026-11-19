const fs = require('fs');

const updateFile = (file, transform) => {
    let content = fs.readFileSync(file, 'utf-8');
    content = transform(content);
    fs.writeFileSync(file, content);
};

// Update Header.tsx
updateFile('resources/js/components/Header.tsx', (content) => {
    let newContent = content
        .replace(/import \{ PageView \} from '\.\.\/types';/g, 'import { Link } from \'@inertiajs/react\';')
        .replace(/interface HeaderProps \{[\s\S]*?\}/, 'interface HeaderProps { currentPage?: string; }')
        .replace(/export default function Header\(\{ currentPage, onNavigate \}: HeaderProps\) \{/, 'export default function Header({ currentPage }: HeaderProps) {')
        .replace(/const navItems: \{ label: string; value: PageView \}\[\] = \[/, 'const navItems: { label: string; value: string; route: string }[] = [')
        .replace(/\{ label: 'Home', value: 'home' \}/g, '{ label: "Home", value: "home", route: "/" }')
        .replace(/\{ label: 'Inventory', value: 'inventory' \}/g, '{ label: "Inventory", value: "inventory", route: "/inventory" }')
        .replace(/\{ label: 'About Us', value: 'about' \}/g, '{ label: "About Us", value: "about", route: "/about" }')
        .replace(/\{ label: 'Contact', value: 'contact' \}/g, '{ label: "Contact", value: "contact", route: "/contact" }')
        .replace(/\{ label: 'Admin', value: 'admin' \}/g, '{ label: "Admin", value: "admin", route: "/admin" }')
        .replace(/<button([^>]*)onClick=\{[^\}]*handleNavClick\(item\.value\)[^\}]*\}/g, '<Link$1href={item.route}')
        .replace(/<\/button>/g, '</Link>')
        .replace(/<div \n          onClick=\{[^\}]*handleNavClick\('home'\)[^\}]*\}/, '<Link href="/" ')
        .replace(/<\/div>\n\n        \{\/\* Desktop Navigation \*\/\}/, '</Link>\n\n        {/* Desktop Navigation */}');
    
    // Fix remaining buttons that became links
    newContent = newContent.replace(/<Link\n            onClick=\{[^\}]*handleNavClick\('contact'\)[^\}]*\}/g, '<Link href="/contact"');
    newContent = newContent.replace(/<Link\n              onClick=\{[^\}]*handleNavClick\('contact'\)[^\}]*\}/g, '<Link href="/contact"');
    return newContent;
});

// Update Footer.tsx
updateFile('resources/js/components/Footer.tsx', (content) => {
    return content
        .replace(/import \{ PageView \} from '\.\.\/types';/g, 'import { Link } from \'@inertiajs/react\';')
        .replace(/interface FooterProps \{[\s\S]*?onNavigate: \(page: PageView\) => void;[\s\S]*?\}/, '')
        .replace(/export default function Footer\(\{ onNavigate \}: FooterProps\) \{/, 'export default function Footer() {')
        .replace(/onClick=\{[^\}]*onNavigate\('home'\)[^\}]*\}/g, 'href="/"')
        .replace(/onClick=\{[^\}]*onNavigate\('inventory'\)[^\}]*\}/g, 'href="/inventory"')
        .replace(/onClick=\{[^\}]*onNavigate\('about'\)[^\}]*\}/g, 'href="/about"')
        .replace(/onClick=\{[^\}]*onNavigate\('contact'\)[^\}]*\}/g, 'href="/contact"')
        .replace(/onClick=\{[^\}]*onNavigate\('admin'\)[^\}]*\}/g, 'href="/admin"')
        .replace(/<button/g, '<Link')
        .replace(/<\/button>/g, '</Link>');
});
