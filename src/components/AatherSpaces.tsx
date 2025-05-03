import React, { useEffect, useRef, useState, ErrorInfo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  motion, 
  useAnimation, 
  useInView, 
  Variants, 
  AnimationControls, 
  HTMLMotionProps,
  Target,
  VariantLabels,
  TargetAndTransition,
  ValueTarget,
  MotionProps
} from 'framer-motion';

interface AatherSpacesProps {
  backgroundImage: string;
  cityCount?: string;
  spaceCount?: string;
}

// Error boundary component
class AnimationErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Animation error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="animate-fade-in">{this.props.children}</div>;
    }

    return this.props.children;
  }
}

const AatherSpaces: React.FC<AatherSpacesProps> = ({ 
  backgroundImage,
  cityCount = "223+",
  spaceCount = "317+"
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // Animation controls with proper type definition
  const controls: AnimationControls = useAnimation();
  // Container ref with proper type
  const containerRef = useRef<HTMLDivElement | null>(null);
  // useInView hook with proper options
  const isInView: boolean = useInView(containerRef, { 
    once: true, 
    amount: 0.2
  });
  
  // Handle animation when component comes into view
  useEffect(() => {
    let isMounted = true;
    
    if (isInView) {
      try {
        // Start animations when component comes into view
        controls.start('visible')
          .catch(error => {
            if (isMounted) {
              console.error("Animation error:", error);
              setHasError(true);
            }
          });
      } catch (error) {
        if (isMounted) {
          console.error("Animation setup error:", error);
          setHasError(true);
        }
      }
    }
    
    return () => {
      isMounted = false;
    };
  }, [isInView, controls]);

  // Fallback animation if framer-motion fails
  useEffect(() => {
    // Set loaded state after a delay to ensure a fallback animation if framer-motion fails
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Matches lg: breakpoint in Tailwind
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Animation variants with proper type definitions
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.15, // Slightly faster staggering for smoother flow
        delayChildren: 0.1,
        when: "beforeChildren", // Ensure parent animates before children
        ease: "easeOut"
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "tween", 
        duration: 0.5,
        ease: "easeOut",
        willChange: "opacity, transform" // Hint browser for optimization
      }
    }
  };
  
  const statsVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "tween",
        duration: 0.5,
        delay: 0.5, // Slightly shorter delay for better flow
        ease: "easeOut"
      }
    }
  };

  const imageVariants: Variants = {
    hidden: { scale: 1.1, opacity: 0.8 },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut",
        willChange: "transform, opacity" // Optimize browser rendering
      }
    }
  };

  // Type-safe motion component props
  type SafeMotionDivProps = HTMLMotionProps<"div"> & MotionProps & {
    variants?: Variants;
    initial?: boolean | Target | VariantLabels;
    animate?: TargetAndTransition | VariantLabels | AnimationControls;
  };
  
  type SafeMotionSpanProps = HTMLMotionProps<"span"> & MotionProps & {
    variants?: Variants;
    initial?: boolean | Target | VariantLabels;
    animate?: TargetAndTransition | VariantLabels | AnimationControls;
  };
  
  type SafeMotionImgProps = HTMLMotionProps<"img"> & MotionProps & {
    variants?: Variants;
    initial?: boolean | Target | VariantLabels;
    animate?: TargetAndTransition | VariantLabels | AnimationControls;
  };
  // Fallback classes for non-JS or animation error scenarios
  const fallbackClass = isLoaded ? "opacity-100" : "opacity-0";
  const errorFallbackClass = hasError ? "animate-fade-in" : "";

  return (
    <section className="w-full py-20 px-4 sm:px-6" aria-labelledby="ather-spaces-heading">
      <div className="container mx-auto relative z-10">
        <AnimationErrorBoundary>
          <motion.div 
            ref={containerRef}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className={`relative w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${fallbackClass} ${errorFallbackClass}`}
            style={{ transition: 'opacity 0.5s ease-in-out' }}
            whileHover={{ scale: 1.01 }}
            transition={{ 
              duration: 0.3, 
              type: "tween", 
              ease: "easeInOut" 
            }}
          >
          {/* Background Image with Parallax Effect */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden bg-gray-100 transition-all duration-500 will-change-transform">
            <motion.img 
              src={backgroundImage} 
              alt="Ather Experience Centre" 
              className="w-full h-full object-cover absolute inset-0"
              loading="lazy"
              variants={imageVariants}
              // Part of parent animation flow
              // Do not specify initial/animate here to avoid conflicts with variants
              onLoad={() => setIsLoaded(true)}
              onError={(e) => {
                console.error("Image load error:", e);
                setIsLoaded(true);
                setHasError(true);
              }}
              style={{ 
                transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
                willChange: 'transform, opacity', // Performance hint for browsers
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                backfaceVisibility: 'hidden' // Additional performance optimization
              }}
            />
            {/* Gradient Overlay for better text visibility */}
            <div className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 ${
              isMobile 
                ? "bg-gradient-to-b from-white/90 via-white/80 to-white/50" 
                : "bg-gradient-to-r from-white/90 via-white/70 to-transparent"
            }`} />
          </div>
          
          <div className="absolute inset-0 flex items-center z-20 transition-all duration-300 will-change-transform">
            <div className="w-full lg:w-1/2 p-8 lg:p-12 transition-all duration-300 will-change-contents">
              <motion.div 
                variants={itemVariants}
                className="text-gray-600 font-medium mb-4 tracking-wider uppercase text-sm"
                aria-label="Section title"
              >
                Ather Space
              </motion.div>
              
              <motion.h2 
                variants={itemVariants}
                id="ather-spaces-heading" 
                className="text-4xl lg:text-5xl text-gray-800 font-bold mb-3 tracking-tight"
              >
                Take back all the answers.
              </motion.h2>
              
              <motion.h3 
                variants={itemVariants}
                className="text-3xl lg:text-4xl text-gray-800 font-bold mb-8 tracking-tight"
              >
                And a great test ride experience.
              </motion.h3>
              
              <motion.div variants={itemVariants}>
                <Link 
                  to="/locate"
                  className="group inline-flex items-center text-black text-lg font-medium pb-1 relative overflow-hidden"
                  aria-label="Locate an Ather experience centre near you"
                >
                  <span className="relative inline-block">
                    Locate experience centre 
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black transform transition-transform duration-300 group-hover:bg-green-500" />
                  </span>
                  <motion.span 
                    className="inline-flex items-center ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ 
                      duration: 0.2, 
                      type: "spring", 
                      stiffness: 400,
                      damping: 10 
                    }}
                  >
                    <ArrowRight size={18} className="text-black group-hover:text-green-500 transition-colors duration-300" />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
            
            {/* Desktop Stats */}
            <motion.div 
              variants={statsVariants}
              className="hidden lg:flex absolute right-12 bottom-12 text-right gap-12 z-30"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  duration: 0.2, 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 10 
                }}
              >
                <div className="text-5xl font-bold text-gray-800">{cityCount}</div>
                <div className="text-gray-600 text-lg mt-1">Cities</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  duration: 0.2, 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 10 
                }}
              >
                <div className="text-5xl font-bold text-gray-800">{spaceCount}</div>
                <div className="text-gray-600 text-lg mt-1">Ather Spaces</div>
              </motion.div>
            </motion.div>
            
            {/* Mobile Stats - Shown only on mobile/tablet */}
            <motion.div
              variants={statsVariants}
              key="mobile-stats"
              // Use parent animation controls for coordination
              className="lg:hidden flex justify-between absolute bottom-6 left-8 right-8 bg-white/90 p-4 rounded-lg shadow-md z-30"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{cityCount}</div>
                <div className="text-gray-600 text-sm">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{spaceCount}</div>
                <div className="text-gray-600 text-sm">Ather Spaces</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        </AnimationErrorBoundary>
        
        {/* Animation optimization markers (hidden from view) */}
        <div className="sr-only" aria-hidden="true">
          <div id="animation-trigger-ather-spaces" />
        </div>
      </div>
    </section>
  );
};

export default AatherSpaces;
