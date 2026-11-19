const fs = require('fs');

const pages = [
  'HomeView.tsx',
  'InventoryView.tsx',
  'VehicleDetailsView.tsx',
  'AboutView.tsx',
  'ContactView.tsx',
];

pages.forEach(page => {
    const file = `resources/js/Pages/${page}`;
    let content = fs.readFileSync(file, 'utf-8');
    
    // Add imports
    content = `import PublicLayout from '../components/PublicLayout';\nimport { Link } from '@inertiajs/react';\n` + content;
    
    // Remove old onNavigate props and types
    content = content.replace(/onNavigate: \(page: string\) => void;/g, '');
    content = content.replace(/onNavigate=\{onNavigate\}/g, '');
    content = content.replace(/onNavigate,/g, '');
    content = content.replace(/onNavigate/g, '/*onNavigate*/'); // Just in case
    
    // Add layout
    const componentName = page.replace('.tsx', '');
    content += `\n${componentName}.layout = (page: React.ReactNode) => <PublicLayout currentPage="${page === 'HomeView.tsx' ? 'home' : (page === 'InventoryView.tsx' ? 'inventory' : 'home')}">{page}</PublicLayout>;\n`;
    
    // Replace custom links with Inertia Link
    if (page === 'HomeView.tsx') {
        content = content.replace(/<button([^>]*)onClick=\{[^\}]*onNavigate\('inventory'\)[^\}]*\}/g, '<Link$1href="/inventory"');
        content = content.replace(/<\/button>/g, '</Link>');
        content = content.replace(/onClick=\{[^\}]*onSelectMakeFilter\((.*?)\)[^\}]*\}/g, 'href={`/inventory?make=${$1}`}');
    }
    
    if (page === 'VehicleDetailsView.tsx') {
        content = content.replace(/onClick=\{onBackToInventory\}/g, 'href="/inventory"');
        content = content.replace(/onClick=\{onNavigateToContact\}/g, 'href="/contact"');
        content = content.replace(/<button([^>]*)href=/g, '<Link$1href=');
        content = content.replace(/<\/button>/g, '</Link>');
    }
    
    if (page === 'InventoryView.tsx') {
        content = content.replace(/onClick=\{[^\}]*onSelectVehicle\(vehicle.id\)[^\}]*\}/g, 'href={`/inventory/${vehicle.id}`}');
    }
    
    fs.writeFileSync(file, content);
});

// Admin view is special, it needs AuthenticatedLayout and Inertia form submission
const adminFile = 'resources/js/Pages/AdminView.tsx';
let adminContent = fs.readFileSync(adminFile, 'utf-8');
adminContent = `import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';\nimport { Head, useForm, Link } from '@inertiajs/react';\n` + adminContent;
adminContent += `\nAdminView.layout = (page: React.ReactNode) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;\n`;
fs.writeFileSync(adminFile, adminContent);
