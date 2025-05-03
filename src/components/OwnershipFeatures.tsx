
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  linkText,
  linkUrl,
  className
}) => {
  return (
    <div className={`bg-ather-darkGray rounded-lg p-8 text-white h-full flex flex-col transform hover:-translate-y-0.25 hover:shadow-md hover:shadow-ather-green/2 transition-all duration-300 ease-out group ${className || ''}`}>
      <div className="text-ather-green mb-6 transform group-hover:scale-101 transition-transform duration-300 ease-out">{icon}</div>
      
      <h3 className="text-2xl font-semibold mb-4 group-hover:text-ather-green transition-colors duration-300 ease-out">{title}</h3>
      <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300 ease-out">{description}</p>
      
      {linkText && linkUrl && (
        <div className="mt-auto">
          <Link 
            to={linkUrl}
            className="inline-flex items-center text-white font-medium relative group/link"
          >
            <span className="relative">
              {linkText}
              <span className="absolute bottom-0 left-0 w-full h-[0.5px] bg-ather-green transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out origin-left" />
            </span>
            <ArrowRight size={16} className="ml-1 transform group-hover/link:translate-x-0.25 transition-transform duration-300 ease-out" />
          </Link>
        </div>
      )}
    </div>
  );
};

interface OwnershipFeaturesProps {
  title: string;
}

const OwnershipFeatures: React.FC<OwnershipFeaturesProps> = ({ title }) => {
  return (
    <section className="bg-black py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl text-white font-bold mb-12 text-center">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={
              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-ather-green/5 transition-colors duration-300 ease-out" />
              </div>
            }
            title="Assured Buyback"
            description="Get up to 60% of your Ather's value back, right after 3 years of ownership. A rewarding ride, even when you part with it."
            linkText="Learn more"
            linkUrl="/assured-buyback"
            className="hover:bg-gradient-to-b hover:from-ather-darkGray hover:to-black/95 transition-colors duration-300 ease-out"
          />
          
          <FeatureCard 
            icon={
              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-ather-green/5 transition-colors duration-300 ease-out" />
              </div>
            }
            title="Eight70 Warranty"
            description="A warranty that covers not just battery failure, but degradation too. If the battery health falls below 70% anytime in 8 years, we will replace it."
            linkText="Explore Eight70"
            linkUrl="/eight70"
          />

          {/* New Battery Support Card with Animation */}
          <FeatureCard 
            icon={
              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="7" width="12" height="14" rx="2" />
                  <line x1="12" y1="4" x2="12" y2="7" />
                  <line x1="9" y1="11" x2="15" y2="11" />
                </svg>
                <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-ather-green/5 transition-colors duration-300 ease-out" />
              </div>
            }
            title="Extended Battery Support"
            description="Get comprehensive battery care with our extended support program. Includes health monitoring, optimizations, and free checkups."
            linkText="Learn more"
            linkUrl="/battery-support"
            className="hover:bg-gradient-to-b hover:from-ather-darkGray hover:to-black/95 transition-colors duration-300 ease-out"
          />

          {/* New 24/7 Support Card with Animation */}
          <FeatureCard 
            icon={
              <div className="relative">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-ather-green/5 transition-colors duration-300 ease-out" />
              </div>
            }
            title="24/7 Roadside Assistance"
            description="Round-the-clock support whenever you need it. Our expert team is just a call away, ready to assist you anywhere, anytime."
            linkText="View coverage"
            linkUrl="/roadside-assistance"
            className="hover:bg-gradient-to-b hover:from-ather-darkGray hover:to-black/95 transition-colors duration-300 ease-out"
          />
        </div>
      </div>
    </section>
  );
};

export default OwnershipFeatures;
