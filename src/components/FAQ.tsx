
import React, { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation, useInView, Variants } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(itemRef, { once: true, amount: 0.2 });

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const contentVariants: Variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        },
        opacity: {
          duration: 0.2
        }
      }
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        },
        opacity: {
          duration: 0.25,
          delay: 0.05
        }
      }
    }
  };

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={itemRef}
      variants={itemVariants}
      initial="hidden"
      animate={controls}
      className="border-t border-gray-200 py-6"
      style={{
        willChange: isHovered ? "transform" : "auto",
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased"
      }}
    >
      <motion.button
        className={`
          flex justify-between items-center w-full text-left 
          rounded-lg px-4 py-3 transition-all duration-300 ease-out
          ${isHovered || isOpen ? 'bg-gray-50/80 shadow-sm translate-x-1' : 'bg-transparent'}
          ${isOpen ? 'bg-gradient-to-r from-gray-50 to-white border-l-4 border-green-500' : ''}
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2
          focus-visible:bg-gray-50/80
          hover:bg-gray-50/80 hover:shadow-sm hover:translate-x-1
          group relative
          after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left
          after:scale-x-0 after:bg-green-500 after:transition-transform after:duration-300
          ${isOpen ? 'after:scale-x-100' : ''}
          will-change-transform
          hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-transparent
          transform-gpu
        `}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.002, // More subtle scale
          transition: {
            duration: 0.2,
            ease: "easeOut"
          }
        }}
        whileTap={{ 
          scale: 0.998,
          transition: {
            duration: 0.1,
            ease: "easeOut"
          }
        }}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <motion.h3 
          className="text-lg font-medium"
          animate={{ color: isOpen ? '#16a34a' : '#1f2937' }}
        >
          {question}
        </motion.h3>
        <motion.span 
          className="ml-6 flex-shrink-0"
          animate={{ 
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
            color: isOpen ? '#16a34a' : '#1f2937'
          }}
          transition={{ 
            duration: 0.3,
            scale: {
              duration: 0.2
            }
          }}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </motion.span>
      </motion.button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            variants={contentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden min-h-0"
            layoutId={`faq-content-${index}`}
            style={{
              transformOrigin: "top",
              willChange: "transform, opacity, height"
            }}
          >
            <motion.div 
              className="text-gray-600 mt-3 px-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface FAQSectionProps {
  faqs: Omit<FAQItemProps, 'index'>[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section className="py-16 px-4 relative" ref={sectionRef}>
      {/* Add subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />
      <div className="container mx-auto max-w-3xl relative">
        <motion.h2 
          className="text-4xl font-bold mb-12 relative"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
        >
          Your questions, answered
          <motion.span
            className="absolute -bottom-3 left-0 w-20 h-1 bg-green-500 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          />
        </motion.h2>
        
        <div>
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, duration: 0.5 }
            }
          }}
        >
          <p className="text-gray-600">
            Can't find what you're looking for?<br />
            <Link 
              to="/faq" 
              className="
                inline-flex items-center text-black font-medium 
                hover:text-green-600 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                rounded-md px-3 py-1.5
                group relative
                hover:bg-green-50/50
                active:scale-95
                transform-gpu
              "
              onMouseEnter={() => setIsLinkHovered(true)}
              onMouseLeave={() => setIsLinkHovered(false)}
            >
              <span className="relative">
                Visit our FAQs page
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <motion.span 
                className="ml-1 inline-block transform-gpu"
                initial={false}
                animate={isLinkHovered ? { x: 5, opacity: 1 } : { x: 0, opacity: 0.8 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10,
                  mass: 0.5,
                  opacity: { duration: 0.2 }
                }}
                style={{
                  willChange: isLinkHovered ? "transform, opacity" : "auto"
                }}
              >
                →
              </motion.span>
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
