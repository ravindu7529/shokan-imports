const fs = require('fs');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

// 1. Header.tsx
let header = fs.readFileSync('resources/js/components/Header.tsx', 'utf-8');
header = replaceAll(header, `import { PageView } from '../types';`, `import { Link } from '@inertiajs/react';`);
header = replaceAll(header, `interface HeaderProps {\n  currentPage: PageView;\n  onNavigate: (page: PageView) => void;\n}`, `interface HeaderProps {\n  currentPage: string;\n}`);
header = replaceAll(header, `export default function Header({ currentPage, onNavigate }: HeaderProps) {`, `export default function Header({ currentPage }: HeaderProps) {`);
header = replaceAll(header, `const navItems: { label: string; value: PageView }[] = [`, `const navItems: { label: string; value: string; route: string }[] = [`);
header = replaceAll(header, `{ label: 'Home', value: 'home' }`, `{ label: 'Home', value: 'home', route: '/' }`);
header = replaceAll(header, `{ label: 'Inventory', value: 'inventory' }`, `{ label: 'Inventory', value: 'inventory', route: '/inventory' }`);
header = replaceAll(header, `{ label: 'About Us', value: 'about' }`, `{ label: 'About Us', value: 'about', route: '/about' }`);
header = replaceAll(header, `{ label: 'Contact', value: 'contact' }`, `{ label: 'Contact', value: 'contact', route: '/contact' }`);
header = replaceAll(header, `{ label: 'Admin', value: 'admin' }`, `{ label: 'Admin', value: 'admin', route: '/admin' }`);

// Replacing the buttons with Links in Header
header = header.replace(/onClick=\{\(\) => handleNavClick\('home'\)\}/g, 'href="/"');
header = header.replace(/onClick=\{\(\) => handleNavClick\('contact'\)\}/g, 'href="/contact"');
header = header.replace(/onClick=\{\(\) => handleNavClick\(item\.value\)\}/g, 'href={item.route}');
header = replaceAll(header, `<button\n              key={item.value}`, `<Link\n              key={item.value}`);
header = replaceAll(header, `</button>\n          ))}`, `</Link>\n          ))}`);
header = replaceAll(header, `<button\n            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}`, `<button\n            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}`); // keep mobile menu button
header = replaceAll(header, `onClick={() => handleNavClick('contact')}\n            className="inline-flex`, `href="/contact"\n            className="inline-flex`);
header = replaceAll(header, `</button>\n        </div>\n\n        {/* Mobile Menu Button */}`, `</Link>\n        </div>\n\n        {/* Mobile Menu Button */}`);
header = replaceAll(header, `onClick={() => handleNavClick('contact')}\n              className="w-full text-center`, `href="/contact"\n              className="inline-flex justify-center w-full text-center`);
header = replaceAll(header, `Inquire Now\n            </button>\n          </div>`, `Inquire Now\n            </Link>\n          </div>`);

// Replace the root div of logo to Link
header = replaceAll(header, `<div \n          onClick={() => handleNavClick('home')} \n          className="flex cursor-pointer items-center space-x-2.5 group"\n          id="header-logo-container"\n        >`, `<Link \n          href="/" \n          className="flex cursor-pointer items-center space-x-2.5 group"\n          id="header-logo-container"\n        >`);
header = replaceAll(header, `</span>\n          </div>\n        </div>`, `</span>\n          </div>\n        </Link>`);
fs.writeFileSync('resources/js/components/Header.tsx', header);

// 2. Footer.tsx
let footer = fs.readFileSync('resources/js/components/Footer.tsx', 'utf-8');
footer = replaceAll(footer, `import { PageView } from '../types';`, `import { Link } from '@inertiajs/react';`);
footer = replaceAll(footer, `interface FooterProps {\n  onNavigate: (page: PageView) => void;\n}\n\nexport default function Footer({ onNavigate }: FooterProps) {`, `export default function Footer() {`);
footer = replaceAll(footer, `onClick={() => onNavigate('home')}`, `href="/"`);
footer = replaceAll(footer, `onClick={() => onNavigate('inventory')}`, `href="/inventory"`);
footer = replaceAll(footer, `onClick={() => onNavigate('about')}`, `href="/about"`);
footer = replaceAll(footer, `onClick={() => onNavigate('contact')}`, `href="/contact"`);
footer = replaceAll(footer, `onClick={() => onNavigate('admin')}`, `href="/admin"`);
footer = footer.replace(/<button([^>]*)href=/g, '<Link$1href=');
footer = replaceAll(footer, `</button>`, `</Link>`);
fs.writeFileSync('resources/js/components/Footer.tsx', footer);

// 3. Page Views
const pages = [
  { name: 'HomeView.tsx', layout: 'home' },
  { name: 'InventoryView.tsx', layout: 'inventory' },
  { name: 'VehicleDetailsView.tsx', layout: 'home' },
  { name: 'AboutView.tsx', layout: 'home' },
  { name: 'ContactView.tsx', layout: 'home' },
];

pages.forEach(page => {
  let content = fs.readFileSync(`resources/js/Pages/${page.name}`, 'utf-8');
  content = `import PublicLayout from '../components/PublicLayout';\nimport { Link } from '@inertiajs/react';\n` + content;
  
  // Strip out props related to navigation
  content = content.replace(/onNavigate: \([^)]+\) => void;/g, '');
  content = content.replace(/onNavigate,\s*/g, '');
  content = content.replace(/onNavigate=\{onNavigate\}/g, '');
  
  // Specific replacements
  if (page.name === 'HomeView.tsx') {
    content = content.replace(/onSelectMakeFilter: \([^)]+\) => void;/g, '');
    content = content.replace(/onSelectMakeFilter,/g, '');
    content = content.replace(/onSelectVehicle: \([^)]+\) => void;/g, '');
    content = content.replace(/onSelectVehicle,/g, '');
    
    // Replace View all button
    content = replaceAll(content, `<button\n            onClick={() => onNavigate('inventory')}`, `<Link\n            href="/inventory"`);
    content = replaceAll(content, `View Full Inventory\n          </button>`, `View Full Inventory\n          </Link>`);
    
    // Replace make filter buttons
    content = content.replace(/onClick=\{\(\) => onSelectMakeFilter\((.*?)\)\}/g, 'href={`/inventory?make=${$1}`}');
    content = content.replace(/<button\n              key=\{make.name\}\n              onClick/g, '<Link\n              key={make.name}\n              onClick');
    // Note: The make buttons are rendered in a map, need to replace </button> with </Link> for them
    content = replaceAll(content, `</span>\n            </button>\n          ))}`, `</span>\n            </Link>\n          ))}`);

    // Replace vehicle card click
    content = content.replace(/onClick=\{\(\) => onSelectVehicle\(vehicle.id\)\}/g, 'href={`/inventory/${vehicle.id}`}');
    content = content.replace(/<div\n            key=\{vehicle\.id\}\n            onClick/g, '<Link\n            key={vehicle.id}\n            onClick');
    content = replaceAll(content, `</div>\n\n          </div>\n        </div>`, `</div>\n\n          </div>\n        </Link>`); // This might be tricky, let's just leave vehicle cards as divs and use Inertia router instead for complex ones. Or wrap.
  }
  
  if (page.name === 'InventoryView.tsx') {
    content = content.replace(/onSelectVehicle: \([^)]+\) => void;/g, '');
    content = content.replace(/onSelectVehicle,/g, '');
    content = content.replace(/onClearMakeFilter: \(\) => void;/g, '');
    content = content.replace(/onClearMakeFilter,/g, '');
    content = content.replace(/selectedMakeFilter: string;/g, 'selectedMakeFilter?: string;');
    
    content = content.replace(/onClick=\{\(\) => onSelectVehicle\(vehicle\.id\)\}/g, 'href={`/inventory/${vehicle.id}`}');
    // We will just use `import { router } from '@inertiajs/react'` and `onClick={() => router.visit(...)}` for cards if it's easier.
  }
  
  if (page.name === 'VehicleDetailsView.tsx') {
    content = content.replace(/onBackToInventory: \(\) => void;/g, '');
    content = content.replace(/onBackToInventory,/g, '');
    content = content.replace(/onNavigateToContact: \(\) => void;/g, '');
    content = content.replace(/onNavigateToContact,/g, '');
    
    content = replaceAll(content, `onClick={onBackToInventory}`, `onClick={() => window.location.href = '/inventory'}`);
    content = replaceAll(content, `onClick={onNavigateToContact}`, `onClick={() => window.location.href = '/contact'}`);
  }
  
  const componentName = page.name.replace('.tsx', '');
  content += `\n${componentName}.layout = (page: any) => <PublicLayout currentPage="${page.layout}">{page}</PublicLayout>;\n`;
  
  fs.writeFileSync(`resources/js/Pages/${page.name}`, content);
});

// AdminView.tsx
let admin = fs.readFileSync('resources/js/Pages/AdminView.tsx', 'utf-8');
admin = `import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';\nimport { Head, useForm, Link } from '@inertiajs/react';\n` + admin;
admin = admin.replace(/onNavigate: \([^)]+\) => void;/g, '');
admin = admin.replace(/onNavigate\s*,\s*/g, '');
admin = admin.replace(/onClick=\{\(\) => onNavigate\('inventory'\)\}/g, 'href="/inventory"');
admin = admin.replace(/<button\n              onClick=\{\(\) => onNavigate\('inventory'\)\}/g, '<Link\n              href="/inventory"');
admin = admin.replace(/<span>Back to Inventory<\/span>\n            <\/button>/g, '<span>Back to Inventory</span>\n            </Link>');

admin += `\nAdminView.layout = (page: any) => <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}>{page}</AuthenticatedLayout>;\n`;
fs.writeFileSync('resources/js/Pages/AdminView.tsx', admin);

