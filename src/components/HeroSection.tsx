
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
      className="relative w-full h-screen flex items-center bg-cover bg-center transition-all duration-700 ease-in-out overflow-hidden"
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
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20 h-full flex flex-col justify-between">
        {/* Content Area */}
        <div className="max-w-3xl pt-20 lg:pt-32">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-4 animate-fade-in">
            {currentTab.title}
          </h1>
          
          {currentTab.subtitle && (
            <p className="text-xl md:text-2xl lg:text-3xl text-white mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {currentTab.subtitle}
            </p>
          )}
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {currentTab.primaryButtonText && (
              <Link to={currentTab.primaryButtonUrl || '#'}>
                <Button className="bg-white text-black hover:bg-white/90 hover:text-black rounded-full px-8 py-6 h-auto text-base">
                  {currentTab.primaryButtonText}
                </Button>
              </Link>
            )}
            
            {currentTab.secondaryButtonText && (
              <Link to={currentTab.secondaryButtonUrl || '#'}>
                <Button variant="outline" className="border-white text-white hover:bg-white/20 hover:text-white rounded-full px-8 py-6 h-auto text-base">
                  {currentTab.secondaryButtonText}
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        {/* Bottom area with tabs - updated to match design */}
        <div className="mb-10 flex justify-between items-end">
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
            className="rounded-full bg-black/30 backdrop-blur-sm text-white"
          />
          
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
