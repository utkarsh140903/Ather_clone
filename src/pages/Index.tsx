import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import ChargingNetwork from '@/components/ChargingNetwork';
import OwnershipFeatures from '@/components/OwnershipFeatures';
import AatherSpaces from '@/components/AatherSpaces';
import StoriesSection from '@/components/StoriesSection';
import AccessoriesShowcase from '@/components/AccessoriesShowcase';
import ContactSection from '@/components/ContactSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import LiveChat from '@/components/LiveChat';
import SustainabilityCalculator from '@/components/SustainabilityCalculator';

// Import images
import rizta from '@/assets/rizs1-pangong-blue-mt-electric-scooter.webp';
import scooter450s from '@/assets/450s.png';
import scooter450x from '@/assets/450x.png';
import post1 from '@/assets/Blog7.png';
import post2 from '@/assets/Blog8.png';
import post3 from '@/assets/AtherDUOPortableCharger.webp';
import helmet from '@/assets/ather-smart-helmet.webp';
import accessoriesImage from '@/assets/Accessories.png';
import merch from '@/assets/merch.png';

const Index: React.FC = () => {
  const [showCalculator, setShowCalculator] = useState(false);

  // Scroll to top on page load and handle hash navigation
  useEffect(() => {
    // If no hash, scroll to top
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    
    // Check for calculator hash
    const checkForCalculator = () => {
      if (window.location.hash === '#sustainability-calculator' ||
          window.location.hash === '#calculator') {
        setShowCalculator(true);
        
        // Wait for component to render before scrolling
        setTimeout(() => {
          const calculatorSection = document.getElementById('sustainability-calculator');
          if (calculatorSection) {
            calculatorSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };
    
    // Check on initial load
    checkForCalculator();
    
    // Listen for hash changes
    const handleHashChange = () => {
      checkForCalculator();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Listen for custom event from navbar
    const handleShowCalculator = () => {
      setShowCalculator(true);
    };
    
    window.addEventListener('showCalculator', handleShowCalculator);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('showCalculator', handleShowCalculator);
    };
  }, []);

  // Hero tab content
  const heroTabs = [
    {
      id: 'Ather 450',
      title: 'The 2025 Ather 450',
      subtitle: 'Bike of Scooters',
      backgroundImage: 'https://media.atherenergy.com/The-2025-ather-450-launch.webp',
      primaryButtonText: 'Explore offers',
      primaryButtonUrl: '/offers',
      secondaryButtonText: 'Explore 450',
      secondaryButtonUrl: '/ather-450'
    },
    {
      id: 'Rizta',
      title: 'Meet Rizta.',
      subtitle: 'Your newest family member.',
      backgroundImage: 'https://media.atherenergy.com/Rizta-offers-jan25-d.webp',
      primaryButtonText: 'Book now',
      primaryButtonUrl: '/book-now',
      secondaryButtonText: 'Explore Rizta',
      secondaryButtonUrl: '/rizta'
    },
    {
      id: 'Eight70™',
      title: 'Eight70™',
      subtitle: 'Battery Warranty',
      backgroundImage: 'https://media.atherenergy.com/Ather-home-battery-warranty-d.webp',
      primaryButtonText: 'Request a call back',
      primaryButtonUrl: '/contact',
      secondaryButtonText: 'Know more',
      secondaryButtonUrl: '/warranty'
    },
    {
      id: 'Smart Helmets',
      title: 'Introducing Halo & Halo bit',
      subtitle: 'Smart Helmets by Ather',
      backgroundImage: 'https://media.atherenergy.com/Home_SH_desk.mp4',
      primaryButtonText: 'Browse Products',
      primaryButtonUrl: '/smart-helmets',
      secondaryButtonText: 'Check offers',
      secondaryButtonUrl: '/smart-helmets/offers'
    },
  ];

  // Mock data for products
  const products = [
    {
      id: 'rizta',
      name: 'Ather Rizta',
      image: rizta,
      price: '99,999',
      emi: '2,199/month',
      isNew: true,
      bookUrl: '/book-now',
      exploreUrl: '/rizta'
    },
    {
      id: '450s',
      name: 'Ather 450S',
      image: scooter450s,
      price: '119,999',
      emi: '2,475/month',
      bookUrl: '/book-now',
      exploreUrl: '/450s'
    },
    {
      id: '450x',
      name: 'Ather 450X',
      image: scooter450x,
      price: '146,999',
      emi: '2,789/month',
      bookUrl: '/book-now',
      exploreUrl: '/450x'
    }
  ];

  // Mock data for blog posts
  const blogPosts = [
    {
      id: 'post1',
      image: post2,
      date: '7 May, 2024',
      title: 'Advantages of Fast Charging in Ather Scooters',
      url: '/blog/advantages-fast-charging'
    },
    {
      id: 'post2',
      image: post1,
      date: '7 May, 2024',
      title: '5 Easy Tips for Staying Safe on Your E-Scooter Adventures',
      url: '/blog/staying-safe-escooter'
    },
    {
      id: 'post3',
      image: post3,
      date: '24 Jun, 2024',
      title: 'All You Need to Know About Electric Scooter Charging Cost in India',
      url: '/blog/ev-charging-cost-india'
    }
  ];

  // Mock data for accessories
  const accessories = [
    {
      id: 'helmets',
      name: 'Smart Helmets',
      image: helmet,
      description: 'Say Halo to an all-new helmet experience.',
      linkUrl: '/smart-helmets'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      image: accessoriesImage,
      description: 'Wonderful. Purposeful.',
      linkUrl: '/accessories'
    },
    {
      id: 'merch',
      name: 'Merch',
      image: merch,
      description: 'Apparel & Helmets.',
      linkUrl: '/merch'
    }
  ];

  // Mock data for FAQs
  const faqs = [
    {
      question: 'How do I charge an electric scooter?',
      answer: (
        <div>
          <p>Ather has the largest EV two-wheeler Fast charging grid network in India. There are 3 ways to charge an Ather EV Electric Scooter. The first is with the portable charger provided with your Ather scooter that can be plugged into any 5 amp socket at home, just like you charge your mobile phone. The second is through 3100+ fast-charging grids across the country that can give you up to 15 kms range for every 10 minutes of charging. The third is at public spaces like apartment complexes, malls, university campuses and office buildings where Ather Neighbourhood charges are installed. To request for one to be installed in your building, contact us <Link to="/contact-us" className="font-medium hover:text-ather-green">here</Link>.</p>
        </div>
      )
    },
    {
      question: 'Can I use an electric scooter if I live in an apartment?',
      answer: (
        <p>Yes, you can use an electric scooter if you live in an apartment. Ather scooters come with a portable charger that can be plugged into any standard 5 amp socket. Additionally, many apartment complexes are increasingly installing EV charging points, and Ather has a program to install charging points in residential complexes upon request.</p>
      )
    },
    {
      question: 'Do I need a Drivers\' License, Helmet and Registration to use an electric scooter?',
      answer: (
        <p>Yes. An electric scooter with a motor power exceeding 250W and a top speed above 25 kmph is classified as a motor vehicle in India. This requires a valid driver's license, registration, and insurance. Wearing a helmet is mandatory for both the rider and pillion passenger. Ather scooters fall under this category and require proper licensing and documentation.</p>
      )
    },
    {
      question: 'Why do Electric Scooters have riding modes?',
      answer: (
        <p>Riding modes in electric scooters allow riders to choose between different performance settings based on their needs. Eco mode optimizes range by limiting acceleration and top speed. Ride mode offers a balance between performance and efficiency. Sport mode delivers maximum acceleration and top speed but may reduce range. These options help riders adapt to different traffic conditions, terrains, or personal preferences while managing battery consumption.</p>
      )
    },
    {
      question: 'What is the cost of charging an electric scooter?',
      answer: (
        <p>Charging an Ather electric scooter is very economical. The cost of a full charge depends on electricity rates in your area, but typically ranges from ₹15-30 for a full charge. This gives you a range of 80-115 km depending on the model and riding conditions, which translates to approximately 15-30 paise per kilometer - significantly lower than petrol vehicles that cost around ₹2-3 per kilometer to run.</p>
      )
    },
    {
      question: 'How can I calculate my environmental impact when using an electric scooter?',
      answer: (
        <p>To calculate your environmental impact when using an electric scooter, you can use our <a href="#sustainability-calculator" onClick={(e) => {
          e.preventDefault();
          setShowCalculator(true);
          const calculatorSection = document.getElementById('sustainability-calculator');
          if (calculatorSection) {
            calculatorSection.scrollIntoView({ behavior: 'smooth' });
          }
        }} className="font-medium text-ather-green hover:underline">Sustainability Calculator</a>. This tool helps you compare CO₂ emissions, costs, and health benefits across different vehicle types including gasoline, diesel, hybrid, and electric vehicles. You'll see how much CO₂ you're saving, annual cost differences, and even equivalent metrics like the number of trees worth of carbon absorption you're contributing to by choosing electric mobility.</p>
      )
    }
  ];

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
    
    // Scroll to the calculator section when opened
    if (!showCalculator) {
      setTimeout(() => {
        const calculatorSection = document.getElementById('sustainability-calculator');
        if (calculatorSection) {
          calculatorSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Ather Energy | Electric Scooters with Sustainability Calculator</title>
        <meta name="description" content="Experience the future of mobility with Ather electric scooters. Discover our comprehensive sustainability calculator to understand your environmental impact." />
        <meta name="keywords" content="electric scooters, ather, sustainability, carbon footprint, ev calculator" />
      </Helmet>
      
      <Navbar />
      
      <main>
        <HeroSection tabs={heroTabs} />
        
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">Ather Electric Scooters</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Presenting all-new electric scooters from Ather. Built to outperform both EV scooters and petrol scooters alike, with all the style, smarts and speed you need.
            </p>
          </div>
        </section>
        
        <section className="py-8 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Pick your Ather</h2>
          </div>
        </section>
        
        <ProductShowcase 
          title=""
          products={products.slice(0, 3)}
          compareLink="/compare-models"
          className="pt-0"
        />
        
        <ChargingNetwork 
          backgroundImage="https://media.atherenergy.com/Map_Desktop_result_db0d31ab3d.webp"
          count="4100+"
        />
        
        <AatherSpaces 
          backgroundImage="https://media.atherenergy.com/Experience_center_result_899fcc6d8c.webp"
          cityCount="223+"
          spaceCount="317+"
        />
        
        <OwnershipFeatures 
          title="Ownership taken care of."
        />
        
        {/* Sustainability Calculator Section */}
        <section id="sustainability-calculator" className="py-20 px-4 bg-gradient-to-b from-green-50 to-white scroll-mt-20">
          <div className="container mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Sustainability Calculator</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Understand your environmental impact and discover the benefits of switching to electric mobility. 
              Calculate your savings and carbon footprint reduction.
            </p>
            <div className="mt-8">
              <button
                onClick={toggleCalculator}
                className="inline-flex items-center px-6 py-3 bg-ather-green text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
              >
                {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
              </button>
            </div>
          </div>
          
          {showCalculator && (
            <div className="max-w-7xl mx-auto transition-all duration-500 ease-in-out">
              <SustainabilityCalculator />
            </div>
          )}

          <div id="calculator-about" className="container mx-auto mt-16 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 text-ather-green">Why Calculate Your Environmental Impact?</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-3">Make Informed Choices</h4>
                  <p className="text-gray-700 mb-4">
                    Understanding your carbon footprint is the first step toward sustainable transportation. 
                    Our calculator visualizes the real impact of different vehicle types on the environment.
                  </p>
                  <p className="text-gray-700">
                    By comparing emissions, costs, and health benefits, you can make informed decisions 
                    that align with both your economic interests and environmental values.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3">Ather's Commitment to Sustainability</h4>
                  <p className="text-gray-700 mb-4">
                    At Ather, we're committed to creating a greener future through sustainable mobility solutions. 
                    Our electric scooters are designed to minimize environmental impact without compromising performance.
                  </p>
                  <p className="text-gray-700">
                    We provide this calculator as part of our mission to promote transparency and 
                    environmental awareness in the transportation sector.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <StoriesSection blogPosts={blogPosts} />
        
        <AccessoriesShowcase 
          title="Top up your Ather experience."
          accessories={accessories}
        />
        
        <ContactSection />
        
        <FAQ faqs={faqs} />
      </main>
      
      <Footer />
      <CookieConsent />
      <LiveChat />
    </div>
  );
};

export default Index;
