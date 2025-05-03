import React, { useEffect } from 'react';
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

// Import  images
import rizta from '@/assets/rizs1-pangong-blue-mt-electric-scooter.webp';
import scooter450s from '@/assets/450s.png';
import scooter450x from '@/assets/450x.png';
import post1 from '@/assets/Blog7.png';
import post2 from '@/assets/Blog8.png';
import post3 from '@/assets/AtherDUOPortableCharger.webp';
import helmet from '@/assets/ather-smart-helmet.webp';
import accessoriesImage from '@/assets/Accessories.png';
import merch from '@/assets/merch.png';


const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
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
    }
    ,
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
    }
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
    }
  ];

  return (
    <div className="min-h-screen bg-white">
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
