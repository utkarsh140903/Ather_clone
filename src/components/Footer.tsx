import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FooterColumnProps {
  title: string;
  links: {
    label: string;
    url: string;
    isNew?: boolean;
  }[];
}
const NoticeBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-red-100 text-red-800 fixed w-full top-0 z-50"
        >
          <div className="container mx-auto py-3 px-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center">
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                >
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" x2="12" y1="9" y2="13"/>
                  <line x1="12" x2="12.01" y1="17" y2="17"/>
                </motion.svg>
                <span className="font-medium mr-2">Caution Notice:</span>
                <span>Beware of scammers in Ather's clothing. Don't get tricked into frauds.</span>
              </div>
              
              <div className="flex items-center gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/scam-alert" 
                    className="text-red-800 font-medium flex items-center hover:text-red-900 transition-colors group"
                  >
                    Learn more
                    <motion.span 
                      className="inline-block ml-1"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </Link>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsVisible(false)}
                  className="text-red-700 hover:text-red-900 transition-colors p-1"
                  aria-label="Dismiss notice"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-medium mb-4 text-white">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              to={link.url} 
              className="text-gray-300 hover:text-white transition-colors flex items-center group"
            >
              <span className="relative">
                {link.label}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
              </span>
              {link.isNew && (
                <motion.span 
                  className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  New
                </motion.span>
              )}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/atherenergy",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    },
    {
      name: "Twitter",
      url: "https://twitter.com/atherenergy",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
    },
    {
      name: "YouTube",
      url: "https://youtube.com/atherenergy",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
    },
    {
      name: "Facebook",
      url: "https://facebook.com/atherenergy",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/atherenergy",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
    }
  ];

  return (
    <>
      <NoticeBar />
      <footer className="bg-ather-darkGray text-white mt-12">
      {/* Main footer */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <FooterColumn 
            title="Electric Scooters" 
            links={[
              { label: "Ather Rizta", url: "/rizta", isNew: true },
              { label: "Ather 450 Apex", url: "/450-apex" },
              { label: "Ather 450X", url: "/450x" },
              { label: "Ather 450S", url: "/450s" },
              { label: "Compare Models", url: "/compare" },
              { label: "Book Test Ride", url: "/test-ride" },
              { label: "Locate Dealers", url: "/dealers" }
            ]}
          />
          
          <FooterColumn 
            title="Buy Electric Scooter" 
            links={[
              { label: "Book Ather Scooter", url: "/book" },
              { label: "EMI Calculator", url: "/emi-calculator" },
              { label: "Pricing", url: "/pricing" },
              { label: "Charging", url: "/charging" },
              { label: "Flexipay", url: "/flexipay" }
            ]}
          />
          
          <FooterColumn 
            title="Ownership" 
            links={[
              { label: "Ownership Cost Calculator", url: "/cost-calculator" },
              { label: "Smart Helmets", url: "/smart-helmets" },
              { label: "Accessories", url: "/accessories" },
              { label: "Ather Battery Protect™", url: "/battery-protect" },
              { label: "Ather Connect", url: "/connect" }
            ]}
          />
          
          <FooterColumn 
            title="Pricing" 
            links={[
              { label: "EV Price in Bengaluru", url: "/price-bengaluru" },
              { label: "EV Price in Hyderabad", url: "/price-hyderabad" },
              { label: "EV Price in Chennai", url: "/price-chennai" },
              { label: "EV Price in Delhi", url: "/price-delhi" },
              { label: "EV Price in Mumbai", url: "/price-mumbai" },
              { label: "EV Price in Kolkata", url: "/price-kolkata" }
            ]}
          />
          
          <FooterColumn 
            title="About Us" 
            links={[
              { label: "Story", url: "/story" },
              { label: "Blogs", url: "/blogs" },
              { label: "Community", url: "/community" },
              { label: "Press", url: "/press" },
              { label: "Careers", url: "/careers" }
            ]}
          />
          
          <FooterColumn 
            title="Support" 
            links={[
              { label: "FAQs", url: "/faqs" },
              { label: "Contact Us", url: "/contact" },
              { label: "Retail Partnership", url: "/retail-partnership" },
              { label: "Sitemap", url: "/sitemap" }
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div>
            <h3 className="text-lg font-medium mb-4">Electric Scooter in Bengaluru</h3>
            <Link to="/scooter-bengaluru" className="text-gray-300 hover:text-white transition-colors">
              Electric Scooter in Bengaluru
            </Link>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Electric Scooter in Chennai</h3>
            <Link to="/scooter-chennai" className="text-gray-300 hover:text-white transition-colors">
              Electric Scooter in Chennai
            </Link>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Electric Scooter in Hyderabad</h3>
            <Link to="/scooter-hyderabad" className="text-gray-300 hover:text-white transition-colors">
              Electric Scooter in Hyderabad
            </Link>
          </div>
        </div>
      </div>
      
      {/* Legal footer */}
      <div className="container mx-auto pb-8 px-4 border-t border-gray-700 pt-8">
        <div className="flex justify-center md:justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="text-xl font-bold uppercase tracking-widest">ATHER</div>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/subscription" className="text-sm text-gray-400 hover:text-white">Subscription</Link>
            <Link to="/charger-refund" className="text-sm text-gray-400 hover:text-white">Charger refund</Link>
            <Link to="/warranty" className="text-sm text-gray-400 hover:text-white">Warranty</Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white">Terms</Link>
            <Link to="/code-of-ethics" className="text-sm text-gray-400 hover:text-white">Code of Ethics</Link>
            <Link to="/credit-usage-policy" className="text-sm text-gray-400 hover:text-white">Credit usage policy</Link>
            <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white">Privacy policy</Link>
            <Link to="/refund-policy" className="text-sm text-gray-400 hover:text-white">Refund policy</Link>
            <Link to="/trademarks" className="text-sm text-gray-400 hover:text-white">Trademarks</Link>
            <Link to="/bug-bounty" className="text-sm text-gray-400 hover:text-white">Bug Bounty</Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400">
          <div>
            <h4 className="font-medium mb-2">Registered Office Address</h4>
            <p>Electric Scooters and Data as S(P)aaS | Ather Energy Private Limited,<br />
            3rd Floor, Tower D, IBC Knowledge Park, #4/1 Bannerghatta Main Road,<br />
            Bengaluru, Karnataka 560029, India</p>
          </div>
          
          <div>
            <p>Tel No.: <a href="tel:+917676020900" className="hover:text-white">+91-7676020900</a></p>
            <p>Customer Care: <a href="mailto:support@atherenergy.com" className="hover:text-white">support@atherenergy.com</a></p>
            <p>For Customer Support please write to: <a href="mailto:customercare@atherenergy.com" className="hover:text-white">customercare@atherenergy.com</a></p>
            <p>Need more information or have a query? Feel free to <a href="/contact" className="hover:text-white">Contact us</a></p>
          </div>
          
          <div>
            <p>Corporate Identification Number (CIN)<br />
            U40100KA2013PTC068830</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-8 border-t border-gray-700 pt-8">
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
          
          <div className="text-xs text-gray-400">
            <p>All information is subject to specific conditions | © {currentYear} Ather Energy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
