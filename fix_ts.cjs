const fs = require('fs');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

// 1. Footer.tsx
let footer = fs.readFileSync('resources/js/components/Footer.tsx', 'utf-8');
footer = replaceAll(footer, `const handleNavClick = (page: PageView) => {`, `const handleNavClick = (page: string) => {`);
footer = replaceAll(footer, `onNavigate(page);`, ``); // removed
fs.writeFileSync('resources/js/components/Footer.tsx', footer);

// 2. Header.tsx
let header = fs.readFileSync('resources/js/components/Header.tsx', 'utf-8');
header = replaceAll(header, `const handleNavClick = (page: PageView) => {`, `const handleNavClick = (page: string) => {`);
header = replaceAll(header, `onNavigate(page);`, ``);
fs.writeFileSync('resources/js/components/Header.tsx', header);

// 3. HomeView.tsx
let home = fs.readFileSync('resources/js/Pages/HomeView.tsx', 'utf-8');
home = replaceAll(home, `onSelectMakeFilter }: HomeViewProps`, `}: HomeViewProps`);
home = replaceAll(home, `onSelectVehicle(id);`, ``);
home = replaceAll(home, `onNavigate('vehicle-details');`, `window.location.href = '/inventory/' + id;`);
home = replaceAll(home, `onNavigate('inventory')`, `window.location.href = '/inventory'`);
home = replaceAll(home, `onNavigate('contact')`, `window.location.href = '/contact'`);
home = replaceAll(home, `onClick={() => onNavigate('about')}`, `onClick={() => window.location.href = '/about'}`);
home = replaceAll(home, `onNavigate={onNavigate}`, ``); // For Hero
home = replaceAll(home, `import Hero from './Hero';`, `import Hero from '../components/Hero';`);
fs.writeFileSync('resources/js/Pages/HomeView.tsx', home);

// 4. Hero.tsx
let hero = fs.readFileSync('resources/js/components/Hero.tsx', 'utf-8');
hero = replaceAll(hero, `onNavigate: (page: PageView) => void;`, ``);
hero = replaceAll(hero, `export default function Hero({ onNavigate }: HeroProps)`, `export default function Hero()`);
hero = replaceAll(hero, `import { PageView } from '../types';`, ``);
hero = replaceAll(hero, `onClick={() => onNavigate('inventory')}`, `onClick={() => window.location.href = '/inventory'}`);
hero = replaceAll(hero, `onClick={() => onNavigate('contact')}`, `onClick={() => window.location.href = '/contact'}`);
fs.writeFileSync('resources/js/components/Hero.tsx', hero);

// 5. InventoryView.tsx
let inv = fs.readFileSync('resources/js/Pages/InventoryView.tsx', 'utf-8');
inv = replaceAll(inv, `onClearMakeFilter }: InventoryViewProps`, `}: InventoryViewProps`);
inv = replaceAll(inv, `onSelectVehicle(id);`, ``);
inv = replaceAll(inv, `onNavigate('vehicle-details');`, `window.location.href = '/inventory/' + id;`);
fs.writeFileSync('resources/js/Pages/InventoryView.tsx', inv);

// 6. AdminView.tsx
let admin = fs.readFileSync('resources/js/Pages/AdminView.tsx', 'utf-8');
admin = replaceAll(admin, `onNavigate: (page: string) => void;`, ``);
admin = replaceAll(admin, `onNavigate }: AdminViewProps`, `}: AdminViewProps`);
admin = replaceAll(admin, `onNavigate('inventory')`, `window.location.href = '/inventory'`);
fs.writeFileSync('resources/js/Pages/AdminView.tsx', admin);

// 7. VehicleDetailsView.tsx
let vdv = fs.readFileSync('resources/js/Pages/VehicleDetailsView.tsx', 'utf-8');
vdv = replaceAll(vdv, `onNavigateToContact }: VehicleDetailsViewProps`, `}: VehicleDetailsViewProps`);
fs.writeFileSync('resources/js/Pages/VehicleDetailsView.tsx', vdv);

// 8. Fix PublicLayout case sensitivity
const renameComponentFolder = () => {
  fs.renameSync('resources/js/components', 'resources/js/Components');
};
try { renameComponentFolder(); } catch(e) {}

let about = fs.readFileSync('resources/js/Pages/AboutView.tsx', 'utf-8');
about = replaceAll(about, `../components/`, `../Components/`);
fs.writeFileSync('resources/js/Pages/AboutView.tsx', about);

let contact = fs.readFileSync('resources/js/Pages/ContactView.tsx', 'utf-8');
contact = replaceAll(contact, `../components/`, `../Components/`);
fs.writeFileSync('resources/js/Pages/ContactView.tsx', contact);

home = fs.readFileSync('resources/js/Pages/HomeView.tsx', 'utf-8');
home = replaceAll(home, `../components/`, `../Components/`);
fs.writeFileSync('resources/js/Pages/HomeView.tsx', home);

inv = fs.readFileSync('resources/js/Pages/InventoryView.tsx', 'utf-8');
inv = replaceAll(inv, `../components/`, `../Components/`);
fs.writeFileSync('resources/js/Pages/InventoryView.tsx', inv);

vdv = fs.readFileSync('resources/js/Pages/VehicleDetailsView.tsx', 'utf-8');
vdv = replaceAll(vdv, `../components/`, `../Components/`);
fs.writeFileSync('resources/js/Pages/VehicleDetailsView.tsx', vdv);

// Fix Breeze PageProps
let welcome = fs.readFileSync('resources/js/Pages/Welcome.tsx', 'utf-8');
welcome = replaceAll(welcome, `import { PageProps } from '@/types';`, ``);
welcome = replaceAll(welcome, `}: PageProps<{`, `}: {`);
welcome = replaceAll(welcome, `}>)`, `}`);
fs.writeFileSync('resources/js/Pages/Welcome.tsx', welcome);

let edit = fs.readFileSync('resources/js/Pages/Profile/Edit.tsx', 'utf-8');
edit = replaceAll(edit, `import { PageProps } from '@/types';`, ``);
edit = replaceAll(edit, `}: PageProps<{`, `}: {`);
edit = replaceAll(edit, `}>)`, `}`);
fs.writeFileSync('resources/js/Pages/Profile/Edit.tsx', edit);
