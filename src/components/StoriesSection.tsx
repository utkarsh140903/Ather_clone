
import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';

interface BlogPostProps {
  id: string;
  image: string;
  date: string;
  title: string;
  url: string;
}

const BlogCard: React.FC<BlogPostProps> = ({
  id,
  image,
  date,
  title,
  url
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="h-full"
    >
      <Link 
        to={url} 
        className="block group h-full bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-labelledby={`blog-title-${id}`}
      >
        <div className="relative mb-4 overflow-hidden rounded-t-lg aspect-[16/9]">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
              <span className="sr-only">Loading image...</span>
            </div>
          )}
          <motion.img 
            src={image} 
            alt={`Featured image for article: ${title}`}
            className={`w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            onLoad={() => setImageLoaded(true)}
            style={{ willChange: 'transform' }}
          />
        </div>
        
        <div className="px-5 pb-5">
          <div className="text-sm font-medium text-gray-600 mb-2">{date}</div>
          <h3 
            id={`blog-title-${id}`}
            className="text-xl md:text-2xl font-bold group-hover:text-green-500 transition-colors duration-300 line-clamp-2 mb-3"
          >
            {title}
          </h3>
          <motion.div 
            className="inline-flex items-center text-sm font-medium text-gray-900 group-hover:text-green-500 transition-colors"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span>Read article</span>
            <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

interface StoriesSectionProps {
  blogPosts: BlogPostProps[];
}

const StoriesSection: React.FC<StoriesSectionProps> = ({ blogPosts }) => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Animation variants for container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  // Animation variants for title
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  // Animation variants for CTA button
  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
        >
          Stories at Ather
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          Explore the latest news, updates and stories from the Ather community
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          variants={buttonVariants}
          initial="hidden"
          animate={controls}
          whileHover="hover"
        >
          <Link 
            to="/blog"
            className="inline-flex items-center text-lg font-medium relative group px-6 py-3 overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-full"
            aria-label="View all blog posts"
          >
            <span className="relative z-10 inline-flex items-center transition-all duration-300 group-hover:text-green-600">
              View all blogs 
              <motion.span
                className="inline-block ml-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </motion.span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform origin-left transition-transform duration-300 group-hover:bg-green-500 group-hover:scale-x-100" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StoriesSection;
