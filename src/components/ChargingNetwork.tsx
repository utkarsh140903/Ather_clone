
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChargingNetworkProps {
  backgroundImage: string;
  count?: string;
}

const ChargingNetwork: React.FC<ChargingNetworkProps> = ({ backgroundImage, count = "4100+" }) => {
  return (
    <section className="w-full py-16 relative">
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden bg-black/90 group">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
          
          {/* Background image with parallax effect */}
          <img 
            src={backgroundImage} 
            alt="Ather Grid Network" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s] ease-out"
          />
          
          {/* Content overlay */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="w-full lg:w-1/2 p-8 lg:p-16">
              {/* Brand label with glow effect */}
              <div className="inline-block">
                <div className="text-ather-green font-medium mb-6 text-lg relative">
                  <span className="relative z-10">Ather Grid™</span>
                  <div className="absolute inset-0 bg-ather-green/20 blur-xl -z-10 animate-pulse" />
                </div>
              </div>
              
              {/* Main heading with animated underline */}
              <h2 className="text-4xl lg:text-6xl text-white font-bold mb-8 leading-tight">
                <span className="inline-block transform hover:-translate-y-1 transition-transform duration-300">India's largest</span><br />
                <span className="inline-block transform hover:-translate-y-1 transition-transform duration-300">EV two-wheeler</span><br />
                <span className="inline-block transform hover:-translate-y-1 transition-transform duration-300">fast charging</span><br />
                <span className="inline-block transform hover:-translate-y-1 transition-transform duration-300">network</span>
              </h2>
              
              {/* CTA link with enhanced hover effect */}
              <Link 
                to="/charging"
                className="inline-flex items-center text-white text-lg font-medium relative group/link"
              >
                <span className="relative">
                  Discover charging options
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-ather-green transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left" />
                </span>
                <ArrowRight size={20} className="ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            
            {/* Counter with enhanced animation */}
            <div className="hidden lg:block absolute right-16 bottom-16 text-right transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-7xl font-bold text-white mb-2 tracking-tight">{count}</div>
              <div className="text-white/90 text-lg">
                Fast chargers<br />
                <span className="text-ather-green">and growing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChargingNetwork;
