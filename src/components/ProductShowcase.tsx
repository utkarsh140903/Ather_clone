
import React from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ProductProps {
  id: string;
  name: string;
  image: string;
  price: string;
  emi?: string;
  isNew?: boolean;
  bookUrl: string;
  exploreUrl: string;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  image,
  price,
  emi,
  isNew = false,
  bookUrl,
  exploreUrl,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative">
      {/* New tag */}
      {isNew && (
        <div className="absolute top-4 left-4 z-10 bg-ather-green text-white px-3 py-1 text-sm font-medium rounded-full">
          All New
        </div>
      )}
      
      {/* Image container */}
      <div className="relative overflow-hidden h-[280px] bg-gradient-to-b from-[#f8f8f8] to-[#f2f2f2] rounded-t-2xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain transform group-hover:scale-[1.03] transition-transform duration-500" 
        />
      </div>
      
      {/* Content container */}
      <div className="p-6 bg-white">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-ather-green transition-colors">{name}</h3>
        <p className="text-ather-gray mb-1 text-lg transform group-hover:-translate-y-0.5 transition-transform">
          Starting at <span className="font-semibold">₹ {price}</span>
        </p>
        
        {emi && (
          <div className="flex items-center text-sm text-ather-mediumGray mb-4 group-hover:text-ather-green/80 transition-colors">
            <span>Or Flexipay <span className="font-medium">₹ {emi}</span>/month</span>
            <Info size={16} className="ml-1 cursor-pointer hover:text-ather-green transition-colors" />
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 mt-6">
          <Link 
            to={bookUrl}
            className="px-6 py-2.5 bg-white border-2 border-black rounded-full text-sm font-medium hover:bg-ather-green hover:border-ather-green hover:text-white transition-all duration-300"
          >
            Book now
          </Link>
          
          <Link 
            to={exploreUrl}
            className="inline-flex items-center text-sm font-medium border-b-2 border-black pb-0.5 hover:border-ather-green hover:text-ather-green transition-colors group/link"
          >
            Explore {name.includes('Rizta') ? 'Offers' : name.includes('450') ? '450' : 'More'}
            <ArrowRight size={16} className="ml-1 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

interface ProductShowcaseProps {
  title: string;
  subtitle?: string;
  products: ProductProps[];
  compareLink?: string;
  className?: string;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  title,
  subtitle,
  products,
  compareLink,
  className
}) => {
  return (
    <section className={cn("py-16 px-4", className)}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-ather-gray max-w-3xl mx-auto">{subtitle}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {compareLink && (
          <div className="mt-12 text-center">
            <Link 
              to={compareLink}
              className="inline-flex items-center text-lg font-medium border-b border-black pb-1 hover:border-ather-green hover:text-ather-green transition-colors"
            >
              Compare models <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;
