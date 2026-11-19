const fs = require('fs');

// Fix Footer
let footer = fs.readFileSync('resources/js/components/Footer.tsx', 'utf-8');
footer = footer.replace(/<button/g, '<Link');
fs.writeFileSync('resources/js/components/Footer.tsx', footer);

// Fix Header
let header = fs.readFileSync('resources/js/components/Header.tsx', 'utf-8');
header = header.replace(/<div \n          href="\/"/g, '<Link \n          href="/"');
header = header.replace(/<button\n            href="\/contact"/g, '<Link\n            href="/contact"');
header = header.replace(/<button([^>]+)href=/g, '<Link$1href=');
// But the mobile menu toggle button is now a Link, let's fix it back
header = header.replace(/<Link\n            onClick=\{\(\) => setIsMobileMenuOpen\(\!isMobileMenuOpen\)\}/g, '<button\n            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}');
header = header.replace(/<\/span>\n            \{\n              isMobileMenuOpen \? \(\n                <X className="block h-6 w-6" aria-hidden="true" \/>\n              \) : \(\n                <Menu className="block h-6 w-6" aria-hidden="true" \/>\n              \)\n            \}\n          <\/Link>/, '</span>\n            {\n              isMobileMenuOpen ? (\n                <X className="block h-6 w-6" aria-hidden="true" />\n              ) : (\n                <Menu className="block h-6 w-6" aria-hidden="true" />\n              )\n            }\n          </button>');
// And the desktop menu loop button -> Link
header = header.replace(/<button\n              key=\{item.value\}/g, '<Link\n              key={item.value}');
header = header.replace(/<button\n              href="\/contact"\n              className="w-full text-center/g, '<Link\n              href="/contact"\n              className="w-full text-center');
fs.writeFileSync('resources/js/components/Header.tsx', header);

// Fix HomeView
let home = fs.readFileSync('resources/js/Pages/HomeView.tsx', 'utf-8');
home = home.replace(/<button([^>]*)href=/g, '<Link$1href=');
home = home.replace(/<\/button>\n\s*\}\n\s*<\/div>/g, '</Link>\n              }\n            </div>'); 
// wait, the make filter button:
home = home.replace(/<button\n              key=\{make.name\}\n              href=/g, '<Link\n              key={make.name}\n              href=');
home = home.replace(/<\/span>\n            <\/button>/g, '</span>\n            </Link>');
fs.writeFileSync('resources/js/Pages/HomeView.tsx', home);

// Fix AdminView
let admin = fs.readFileSync('resources/js/Pages/AdminView.tsx', 'utf-8');
admin = admin.replace(/<button\n              href="\/inventory"/g, '<Link\n              href="/inventory"');
fs.writeFileSync('resources/js/Pages/AdminView.tsx', admin);

