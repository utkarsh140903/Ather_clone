import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  motion, 
  useAnimation, 
  useInView, 
  Variants, 
  useReducedMotion, 
  useMotionValue, 
  useTransform,
  useSpring,
  AnimatePresence
} from 'framer-motion';

interface AccessoryProps {
  id: string;
  name: string;
  image: string;
  description: string;
  linkUrl: string;
}

const AccessoryCard: React.FC<AccessoryProps> = ({
  id,
  name,
  image,
  description,
  linkUrl
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Mouse position for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Add spring physics for smoother movement
  const springConfig = { 
    damping: 30, 
    stiffness: 200,
    mass: 0.5 
  };
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]), springConfig);
  
  // Parallax effect for image
  const imageX = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), springConfig);
  const imageY = useSpring(useTransform(mouseY, [-100, 100], [-10, 10]), springConfig);
  
  // Define animation variants with reduced motion alternatives
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : 50 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    hover: !prefersReducedMotion ? {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
        scale: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    } : {
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.3
      }
    },
    focus: {
      outline: "2px solid rgb(34, 197, 94)",
      outlineOffset: "2px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    }
  };
  
  // Image animation variants with reduced motion consideration
  const imageVariants: Variants = {
    hidden: { 
      scale: prefersReducedMotion ? 0.95 : 0.8, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
        ease: "easeOut",
        delay: prefersReducedMotion ? 0.1 : 0.2
      }
    },
    hover: !prefersReducedMotion ? {
      scale: 1.08,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    } : {
      scale: 1.03,
      transition: {
        duration: 0.3
      }
    },
    error: {
      opacity: 0.2,
      scale: 0.95,
      filter: "grayscale(100%)",
      transition: {
        duration: 0.3
      }
    }
  };
  
  // Text animation variants with reduced motion alternatives
  const textVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 10 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.2 : 0.4,
        delay: prefersReducedMotion ? 0.1 : 0.3
      }
    }
  };
  
  // Link animation variants
  const linkVariants: Variants = {
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  // Reset mouse position when mouse leaves with a small delay to prevent flickering
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      mouseX.set(0);
      mouseY.set(0);
      setIsHovered(false);
    }, 100); // Small delay to prevent flickering
  };
  
  // Handle keyboard focus
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
  };
  
  // Clean up the timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <motion.div 
      ref={cardRef}
      className="text-center h-full"
      variants={cardVariants}
      initial="hidden"
      animate={[
        "visible",
        isHovered ? "hover" : "",
        isFocused ? "focus" : ""
      ].filter(Boolean)}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        setIsHovered(true);
      }}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: 1000,
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
      layoutId={`accessory-card-${id}`}
    >
      <motion.div 
        className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm p-4"
        style={!prefersReducedMotion ? {
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d"
        } : {
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transition: "box-shadow 0.3s ease-in-out"
        }}
      >
        {/* Subtle dot pattern background for depth */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ 
               backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", 
               backgroundSize: "20px 20px" 
             }} 
             aria-hidden="true" 
        />
        <div className="mb-6 overflow-hidden rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-8 relative flex items-center justify-center" 
             style={{ 
               minHeight: "240px",
               transformStyle: "preserve-3d",
               transform: "translateZ(10px)" // Subtle 3D effect
             }}
        >
          <AnimatePresence mode="wait">
            {!imageLoaded && !imageError && (
              <motion.div 
                key="loading"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 1 }}
                exit={{ 
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
              >
                <div className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin" />
                <span className="sr-only">Loading {name} image</span>
              </motion.div>
            )}
            
            {imageError && (
              <motion.div 
                key="error"
                className="absolute inset-0 flex flex-col items-center justify-center text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle size={24} className="mb-2" />
                <p className="text-sm">Failed to load image</p>
                <span className="sr-only">Image failed to load for {name}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            variants={imageVariants}
            animate={imageLoaded ? "visible" : "hidden"}
            style={{ 
              transformStyle: "preserve-3d",
              transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out"
            }}
          >
            <motion.img 
              src={image} 
              alt={`${name} product image`}
              className={`w-full h-48 object-contain mx-auto`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: imageLoaded ? 1 : 0,
                scale: imageLoaded ? 1 : 0.95,
                filter: imageError ? "grayscale(100%)" : "none"
              }}
              transition={{ 
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1.0],
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 }
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(false);
              }}
              style={{ 
                willChange: "transform, opacity",
                transform: `perspective(1000px) translateZ(${isHovered ? '20px' : '0px'})`,
                transformStyle: "preserve-3d"
              }}
              loading="lazy"
            />
          </motion.div>
          
          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 transition-opacity duration-500" 
            style={{ 
              opacity: isHovered ? 0.8 : 0,
              willChange: "opacity"
            }}
            aria-hidden="true"
          ></div>
        </div>
        
        <div className="flex-grow flex flex-col">
          <motion.h3 
            className="text-2xl font-bold mb-2 tracking-tight"
            variants={textVariants}
            id={`accessory-name-${id}`}
          >
            {name}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 mb-6 flex-grow"
            variants={textVariants}
          >
            {description}
          </motion.p>
          
          <motion.div
            className="mt-auto"
            whileHover="hover"
          >
            <Link 
              to={linkUrl}
              className="inline-flex items-center text-black text-base font-medium relative pb-1 hover:text-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md"
              aria-labelledby={`accessory-name-${id}`}
            >
              <span className="relative">
                {name === "Smart Helmets" ? "Explore Smart Helmets" : `Shop ${name}`}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform origin-left transition-all duration-300 hover:bg-green-500 hover:scale-x-100"></span>
              </span>
              
              <motion.span
                className="inline-flex ml-2"
                variants={linkVariants}
              >
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface AccessoriesShowcaseProps {
  title: string;
  accessories: AccessoryProps[];
}
const AccessoriesShowcase: React.FC<AccessoriesShowcaseProps> = ({ title, accessories }) => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2,
    margin: "0px 0px -100px 0px" // Start animation slightly before elements come into view
  });
  
  // Container animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        when: "beforeChildren"
      }
    }
  };
  
  // Title animation variants
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <section 
      className="py-20 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50" 
      ref={sectionRef}
      aria-labelledby="accessories-heading"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          <h2 
            id="accessories-heading"
            className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight"
          >
            {title}
          </h2>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Enhance your Ather experience with premium accessories designed for style and functionality.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {accessories.map((accessory) => (
            <AccessoryCard key={accessory.id} {...accessory} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AccessoriesShowcase;
