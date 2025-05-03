
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TabSlider from '@/components/TabSlider';

interface TabContent {
  id: string;
  title: string;
  subtitle?: string;
  backgroundImage: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

interface HeroSectionProps {
  tabs: TabContent[];
  autoChangeInterval?: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  tabs, 
  autoChangeInterval = 5000
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const tabNames = tabs.map(tab => tab.id);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to handle tab switching
  const switchToNextTab = () => {
    setActiveTab((current) => (current + 1) % tabs.length);
  };
  
  // Auto-rotate through tabs
  useEffect(() => {
    const currentTab = tabs[activeTab];
    const isVideo = currentTab.backgroundImage.toLowerCase().endsWith('.mp4');
    
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // If current tab has video background, wait for video to end before switching
    if (isVideo) {
      setIsVideoPlaying(true);
      // We don't set up auto-switching timer for videos
      // Video ended event will trigger the switch instead
    } else {
      setIsVideoPlaying(false);
      // For non-video tabs, switch after the normal interval
      timerRef.current = setTimeout(switchToNextTab, autoChangeInterval);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeTab, tabs, autoChangeInterval]);
  
  const currentTab = tabs[activeTab];

  // Check if the background is a video
  const isVideo = currentTab.backgroundImage.toLowerCase().endsWith('.mp4');

  return (
    <section 
      className="relative w-full h-screen flex items-start bg-cover bg-center transition-all duration-700 ease-in-out overflow-hidden"
      style={{ 
        ...(isVideo ? {} : { backgroundImage: `url(${currentTab.backgroundImage})` }),
      }}
    >
      {isVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={currentTab.backgroundImage}
          autoPlay
          muted
          playsInline
          onEnded={() => {
            setIsVideoPlaying(false);
            switchToNextTab();
          }}
          onPlay={() => setIsVideoPlaying(true)}
        />
      )}
      {/* Enhanced gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {/* Content Area */}
        <div className="px-8 lg:px-16 pt-32 md:pt-36">
          <div className="max-w-xl transform transition-all duration-700 ease-out translate-y-0 opacity-100">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 
              drop-shadow-lg transition-all duration-500 ease-out animate-fade-slide-down">
            {currentTab.title}
          </h1>
          
          {currentTab.subtitle && (
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 
                drop-shadow-md transition-all duration-500 delay-100 animate-fade-slide-down" 
                style={{ animationDelay: '0.2s' }}>
              {currentTab.subtitle}
            </p>
          )}
          
            <div className="flex flex-wrap gap-4 transition-all duration-500 delay-200 
              animate-fade-slide-down" style={{ animationDelay: '0.4s' }}>
            {currentTab.primaryButtonText && (
              <Link to={currentTab.primaryButtonUrl || '#'}>
                <Button 
                  className="bg-white text-slate-900 hover:bg-white/90 hover:scale-105 
                  rounded-full px-8 py-6 h-auto text-base font-semibold
                  transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,255,255,0.3)]
                  hover:shadow-[0_6px_20px_0_rgba(255,255,255,0.4)]
                  active:scale-95 relative overflow-hidden group">
                  <span className="relative z-10">{currentTab.primaryButtonText}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 
                    transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform 
                    duration-700 ease-in-out" />
                </Button>
              </Link>
            )}
            
            {currentTab.secondaryButtonText && (
              <Link to={currentTab.secondaryButtonUrl || '#'}>
                <Button 
                  variant="outline" 
                  className="border-2 border-white text-slate-700 hover:bg-white/10 
                  rounded-full px-8 py-6 h-auto text-base font-semibold
                  transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,255,255,0.2)]
                  hover:shadow-[0_6px_20px_0_rgba(255,255,255,0.3)]
                  active:scale-95 backdrop-blur-sm">
                  {currentTab.secondaryButtonText}
                </Button>
              </Link>
            )}
            </div>
          </div>
        </div>
        
        {/* Bottom area with tabs - Updated with width constraints */}
        <div className="px-8 lg:px-16 mb-8 md:mb-10 transition-all duration-500 ease-out">
          <div className="max-w-fit rounded-full overflow-hidden">
            <TabSlider 
              tabs={tabNames}
              activeTab={activeTab}
              setActiveTab={(index) => {
                // Reset video playback when manually changing tabs
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                }
                setActiveTab(index);
              }}
              className="rounded-full backdrop-blur-sm text-white/90 hover:text-white 
                transition-colors duration-300 shadow-lg px-6 py-2 inline-flex"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
