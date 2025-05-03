import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, useAnimation, useInView, Variants, useReducedMotion } from 'framer-motion';
import { Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Define keyframe animation for error state shake effect
const shakeAnimation = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  @keyframes shimmer {
    100% { transform: translateX(200%); }
  }
  
  .animate-shake {
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }
`;

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: ''
  });
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation controls and references
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  
  // Animate when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        when: 'beforeChildren'
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 1
      }
    },
    hover: !prefersReducedMotion ? {
      scale: 1.05,
      y: -2,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    } : {},
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  const backgroundVariants: Variants = {
    hidden: { 
      opacity: 0,
      x: 50 
    },
    visible: {
      opacity: 0.05,
      x: 0,
      transition: {
        duration: 1,
        ease: 'easeOut'
      }
    },
    hover: !prefersReducedMotion ? {
      scale: 1.1,
      opacity: 0.08,
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse'
      }
    } : {}
  };
  
  // Handle form submission
  const handleGetInTouch = async () => {
    if (formState.status === 'loading') return;
    
    setFormState({ status: 'loading', message: 'Submitting your request...' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success state
      setFormState({
        status: 'success',
        message: 'Thanks! We will call you shortly.'
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setFormState({ status: 'idle', message: '' });
      }, 3000);
      
    } catch (error) {
      // Error state
      setFormState({
        status: 'error',
        message: 'Something went wrong. Please try again.'
      });
    }
  };
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shakeAnimation }} />
      <section className="py-20 px-4 sm:px-6" ref={sectionRef} aria-labelledby="contact-heading">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          className="bg-gray-900 rounded-2xl overflow-hidden p-8 sm:p-12 lg:p-16 relative shadow-xl"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <motion.div 
              className="max-w-xl mb-8 md:mb-0"
              variants={itemVariants}
            >
              <motion.h2 
                id="contact-heading"
                className="text-4xl md:text-5xl text-white font-bold mb-6 tracking-tight"
                variants={itemVariants}
              >
                Wish to know more about Ather?
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-300"
                variants={itemVariants}
              >
                The best things about an Ather can't be put in words, or captured in images. 
                We'll take up all your questions, just drop us your number. We'll call you.
              </motion.p>
              
              {/* Feedback message */}
              <motion.div
                className={`mt-4 transition-all duration-300 ${formState.status === 'idle' ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: formState.status !== 'idle' ? 1 : 0,
                  height: formState.status !== 'idle' ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {formState.status === 'success' && (
                  <motion.div 
                    className="flex items-center text-green-400 font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle size={18} className="mr-2" />
                    <span role="status">{formState.message}</span>
                  </motion.div>
                )}
                
                {formState.status === 'error' && (
                  <motion.div 
                    className="flex items-center text-red-400 font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ 
                      duration: 0.3,
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  >
                    <AlertCircle size={18} className="mr-2 animate-bounce" />
                    <span role="alert">{formState.message}</span>
                    <motion.button
                      onClick={() => setFormState({ status: 'idle', message: '' })}
                      className="ml-2 text-sm underline hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-2 py-1"
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      aria-label="Dismiss error message"
                    >
                      Try again
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
            >
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <Button 
                  className={`
                    relative overflow-hidden
                    ${formState.status === 'idle' ? 'bg-white hover:bg-gray-100' : ''}
                    ${formState.status === 'loading' ? 'bg-gray-50' : ''} 
                    ${formState.status === 'success' ? 'bg-green-500 hover:bg-green-600' : ''} 
                    ${formState.status === 'error' ? 'bg-red-500 hover:bg-red-600' : ''}
                    text-gray-900 
                    px-8 py-6 h-auto text-lg font-medium rounded-lg 
                    transform transition-all duration-300 ease-out
                    ${formState.status === 'success' ? 'text-white scale-105' : ''} 
                    ${formState.status === 'error' ? 'text-white animate-shake' : ''}
                    ${formState.status === 'loading' ? 'cursor-wait opacity-90' : ''}
                    focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none
                    focus-visible:ring-4 focus-visible:ring-green-400 focus-visible:ring-offset-2
                    hover:focus:ring-green-400
                    active:scale-95 active:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    motion-safe:hover:scale-105 motion-safe:active:scale-95
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%]
                    ${formState.status === 'loading' ? 'before:animate-[shimmer_2s_infinite]' : ''}
                  `}
                  onClick={handleGetInTouch}
                  disabled={formState.status === 'loading'}
                  aria-label="Request a call back from Ather"
                  aria-busy={formState.status === 'loading'}
                  aria-live="polite"
                  role="button"
                  tabIndex={0}
                >
                  <span className="flex items-center">
                    {formState.status === 'loading' ? (
                      <>
                        <Loader2 
                          size={20} 
                          className="mr-2 animate-spin" 
                          aria-hidden="true"
                          style={{
                            animation: "spin 1s linear infinite",
                            transformOrigin: "center"
                          }}
                        />
                        <span>Processing...</span>
                      </>
                    ) : formState.status === 'success' ? (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          duration: 0.4
                        }}
                        className="flex items-center"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.1
                          }}
                        >
                          <CheckCircle size={20} className="mr-2" />
                        </motion.span>
                        <span>Success!</span>
                      </motion.div>
                    ) : (
                      <>
                        <Phone size={20} className="mr-2" />
                        <span>Get in touch</span>
                      </>
                    )}
                  </span>
                  
                  {/* Button background effect */}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-1 bg-green-500" 
                    aria-hidden="true"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                    style={{ opacity: formState.status === 'idle' ? 1 : 0 }}
                  />
                </Button>
              </motion.div>
              
              {/* Subtle spotlight effect */}
              {!prefersReducedMotion && (
                <div
                  className="absolute -inset-10 rounded-full bg-white opacity-0 pointer-events-none transition-opacity"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
                    opacity: isHovered ? 1 : 0,
                    transitionDuration: '0.5s'
                  }}
                />
              )}
            </motion.div>
          </div>
          
          {/* Background design elements */}
          <motion.div 
            className="absolute top-0 right-0 w-1/3 h-full"
            variants={backgroundVariants}
            animate={controls}
            whileHover="hover"
          >
            <svg className="w-full h-full text-white" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path 
                fill="currentColor" 
                d="M39.5,-65.3C52.9,-58.4,66.8,-51.1,75.2,-39.2C83.6,-27.4,86.5,-10.9,83.9,4.2C81.4,19.2,73.5,32.8,63.5,44.3C53.5,55.8,41.5,65.2,27.8,70.8C14.2,76.4,-1.1,78.2,-15.1,74.6C-29.2,71,-41.9,62,-52.4,51.1C-62.9,40.3,-71,27.5,-75.1,13.1C-79.3,-1.2,-79.6,-17.1,-73.1,-29.8C-66.6,-42.5,-53.4,-52,-39.7,-58.7C-26,-65.4,-13,-69.3,0.9,-70.7C14.8,-72.1,29.6,-71,39.5,-65.3Z" 
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default ContactSection;
