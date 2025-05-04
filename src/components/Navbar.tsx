
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
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
      { 
        title: 'Sustainability calculator', 
        path: '#sustainability-calculator',
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          const calculatorSection = document.getElementById('sustainability-calculator');
          if (calculatorSection) {
            window.dispatchEvent(new CustomEvent('showCalculator'));
            calculatorSection.scrollIntoView({ behavior: 'smooth' });
          }
        } 
      },
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
          <Link to="/quiz" className="text-sm font-medium text-ather-green hover:text-ather-green-dark">
            Find Your Match
          </Link>
          <a 
            href="#sustainability-calculator" 
            onClick={(e) => {
              e.preventDefault();
              const calculatorSection = document.getElementById('sustainability-calculator');
              if (calculatorSection) {
                // Dispatch custom event to notify Index component to show calculator
                window.dispatchEvent(new CustomEvent('showCalculator'));
                // Smooth scroll to calculator section
                calculatorSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-sm font-medium text-ather-green hover:text-ather-green-dark cursor-pointer"
          >
            Sustainability Calculator
          </a>
          
          <div className="flex items-center pl-3">
            <Link to="/region" className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 block transition-transform hover:scale-110">
              <img src="https://as1.ftcdn.net/v2/jpg/05/33/37/90/1000_F_533379078_I7wWSv66fi8A0aimgR7zj0uOzRuHL7GY.jpg" alt="India flag" className="w-full h-full object-cover" />
            </Link>
          </div>
          
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
