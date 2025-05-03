
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  path: string;
  dropdown?: NavItem[];
}

// Mega menu structure matching the image
const megaMenuItems = {
  electricScooters: [
    { title: 'Ather Rizta', path: '/rizta' },
    { title: '450 Apex', path: '/450-apex' },
    { title: '450X', path: '/450x' },
    { title: '450S', path: '/450s' },
    { title: 'Book Rizta', path: '/book-rizta' },
    { title: 'Book 450', path: '/book-450' },
    { title: 'Compare Models', path: '/compare-models' },
  ],
  resources: [
    { title: 'Investor relations', path: '/investor-relations' },
    { title: 'Charger refund', path: '/charger-refund' },
    { title: 'Dealer locator', path: '/locate' },
    { title: 'EMI calculator', path: '/emi-calculator' },
    { title: 'Savings calculator', path: '/savings-calculator' },
    { title: 'Fast chargers', path: '/fast-chargers' },
    { title: 'Blogs', path: '/blogs' },
    { title: 'FAQs', path: '/faqs' },
  ],
  atherEcosystem: [
    { title: 'Smart Helmets', path: '/smart-helmets' },
    { title: 'Accessories', path: '/accessories' },
    { title: 'Ather Merch', path: '/merch' },
    { title: 'Charging', path: '/charging' },
    { title: 'Ather Battery Warranty', path: '/battery-warranty' },
    { title: 'Ather Connect™', path: '/connect' },
    { title: 'Flexipay', path: '/flexipay' },
  ],
};

const footerLinks = [
  { title: 'Retail Partnership', path: '/retail-partnership' },
  { title: 'Community', path: '/community' },
  { title: 'Press', path: '/press' },
  { title: 'Ather Corporate Program', path: '/corporate-program' },
  { title: 'Careers', path: '/careers' },
  { title: 'Contact Us', path: '/contact-us' },
];

const navItems: NavItem[] = [
  { title: 'Rizta', path: '/rizta' },
  { title: 'Ather 450', path: '/ather-450' },
  { title: '450 Apex', path: '/450-apex' },
  { 
    title: 'Investor Relations',
    path: '/investor-relations',
    dropdown: [
      { title: 'Financial Results', path: '/investor-relations/financial-results' },
      { title: 'Annual Reports', path: '/investor-relations/annual-reports' },
      { title: 'Press Releases', path: '/investor-relations/press-releases' }
    ]
  },
  { title: 'Charging', path: '/charging' },
  { title: 'Smart Helmets & Accessories', path: '/accessories' },
  { title: 'Charger Refund', path: '/charger-refund' },
  { title: 'Locate us', path: '/locate' }
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-6 lg:px-12 max-w-[1800px] mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <span className="text-xl font-bold uppercase tracking-widest">ATHER</span>
          </Link>
          
          {/* Desktop Primary Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/rizta" className="text-sm font-medium hover:text-ather-green">
              Rizta
            </Link>
            <Link to="/ather-450" className="text-sm font-medium hover:text-ather-green">
              Ather 450
            </Link>
            <Link to="/450-apex" className="text-sm font-medium hover:text-ather-green">
              450 Apex
            </Link>
          </nav>
        </div>
        
        {/* Desktop Secondary Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          <div className="relative group">
            <button
              onClick={() => toggleDropdown('Investor Relations')}
              className="flex items-center px-1 py-2 text-sm font-medium hover:text-ather-green"
            >
              Investor Relations <ChevronDown size={16} className="ml-1" />
            </button>
            <div className={cn(
              "absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg border overflow-hidden transition-all duration-300 transform origin-top-right",
              activeDropdown === 'Investor Relations' ? "scale-100 opacity-100" : "scale-0 opacity-0 h-0"
            )}>
              <div className="py-2">
                {navItems[3].dropdown?.map((subitem) => (
                  <Link
                    key={subitem.title}
                    to={subitem.path}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {subitem.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <Link to="/charging" className="text-sm font-medium hover:text-ather-green">
            Charging
          </Link>
          <Link to="/accessories" className="text-sm font-medium hover:text-ather-green whitespace-nowrap">
            Smart Helmets & Accessories
          </Link>
          <Link to="/charger-refund" className="text-sm font-medium hover:text-ather-green">
            Charger Refund
          </Link>
          <Link to="/locate" className="text-sm font-medium hover:text-ather-green">
            Locate us
          </Link>
          
          <div className="flex items-center pl-3">
            <button className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
              <img src="" alt="India flag" className="w-full h-full object-cover" />
            </button>
          </div>
          
          <button className="p-1" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={20} />
          </button>
        </nav>
        
        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Full screen menu overlay (matching the image) */}
      <div className={`fixed inset-0 bg-black/80 z-40 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white p-2"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Mega menu content based on the image */}
        <div className="flex h-full pt-16 pb-8 px-6">
          <div className="w-full flex flex-col h-full text-white">
            {/* Main mega menu sections */}
            <div className="flex flex-1 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pt-8">
                {/* Electric Scooters Column */}
                <div>
                  <h3 className="text-gray-400 font-medium mb-4 text-sm">Electric Scooters</h3>
                  <ul className="space-y-4">
                    {megaMenuItems.electricScooters.map((item) => (
                      <li key={item.title}>
                        <Link to={item.path} className="text-xl font-medium hover:text-ather-green">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Resources Column */}
                <div>
                  <h3 className="text-gray-400 font-medium mb-4 text-sm">Resources</h3>
                  <ul className="space-y-4">
                    {megaMenuItems.resources.map((item) => (
                      <li key={item.title}>
                        <Link to={item.path} className="text-xl font-medium hover:text-ather-green">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Ather Ecosystem Column */}
                <div>
                  <h3 className="text-gray-400 font-medium mb-4 text-sm">Ather Ecosystem</h3>
                  <ul className="space-y-4">
                    {megaMenuItems.atherEcosystem.map((item) => (
                      <li key={item.title}>
                        <Link to={item.path} className="text-xl font-medium hover:text-ather-green">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Footer links */}
            <div className="mt-auto border-t border-gray-700 pt-6">
              <div className="flex flex-wrap gap-x-6 gap-y-4 justify-center md:justify-start">
                {footerLinks.map((link) => (
                  <Link 
                    key={link.title} 
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    {link.title}
                  </Link>
                ))}
                <div className="ml-auto">
                  <button className="bg-white rounded-full px-4 py-2 text-sm font-medium text-black">
                    Looking for help?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
