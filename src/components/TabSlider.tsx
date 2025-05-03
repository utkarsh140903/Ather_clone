
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface TabSliderProps {
  tabs: string[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  className?: string;
}

const TabSlider: React.FC<TabSliderProps> = ({ tabs, activeTab, setActiveTab, className }) => {
  return (
    <Tabs 
      value={tabs[activeTab]} 
      onValueChange={(value) => setActiveTab(tabs.indexOf(value))} 
      className={cn("w-auto", className)}
    >
      <TabsList className="bg-black/30 backdrop-blur-sm rounded-full h-10 p-1">
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm text-white/80 data-[state=active]:bg-white data-[state=active]:text-black transition-all"
            )}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TabSlider;
