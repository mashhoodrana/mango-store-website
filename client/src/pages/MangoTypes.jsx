import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

function MangoTypes() {
  // Refs for scroll animations
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  
  // Check if elements are in view
  const headerInView = useInView(headerRef, { once: false, amount: 0.3 });
  const cardsInView = useInView(cardsRef, { once: false, amount: 0.2 });
  
  // Animation controls
  const headerControls = useAnimation();
  const cardsControls = useAnimation();
  
  // Trigger animations when elements come into view
  useEffect(() => {
    if (headerInView) {
      headerControls.start('visible');
    }
    if (cardsInView) {
      cardsControls.start('visible');
    }
  }, [headerInView, cardsInView, headerControls, cardsControls]);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.6, 0.05, 0.01, 0.9] 
      } 
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  // Page transition
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const mangoVarieties = [
    {
      name: 'Sindhri',
      description: 'Known as the "King of Mangoes" in Pakistan, Sindhri is renowned for its rich, sweet flavor and distinctive aroma. It has a beautiful golden-yellow color and is perfect for desserts and fresh consumption.',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      origin: 'Sindh, Pakistan',
      season: 'May to July'
    },
    {
      name: 'Chaunsa',
      description: 'Chaunsa mangoes are prized for their exceptional sweetness and aromatic flavor. They have a smooth, fiber-free pulp with a rich golden color. This variety is one of Pakistan\'s most exported mangoes.',
      image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      origin: 'Multan, Pakistan',
      season: 'June to August'
    },
    {
      name: 'Anwar Ratol',
      description: 'Anwar Ratol is a small to medium-sized mango with an incredibly sweet taste and distinctive aroma. Despite its smaller size, it packs an intense flavor that mango connoisseurs adore.',
      image: 'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      origin: 'Muzaffargarh, Pakistan',
      season: 'June to July'
    },
    {
      name: 'Langra',
      description: 'Langra mangoes have a distinct taste that combines sweetness with a slight tanginess. They have a green skin even when ripe and feature fiber-free, aromatic yellow flesh that melts in your mouth.',
      image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      origin: 'Punjab, Pakistan',
      season: 'July to August'
    },
    {
      name: 'Dusehri',
      description: 'Dusehri mangoes are known for their distinctive elongated shape and golden-yellow color. They offer a sweet, fiber-free pulp with a delicate aroma that makes them perfect for fresh consumption.',
      image: 'https://images.unsplash.com/photo-1519096845289-95806ee03a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      origin: 'Rahim Yar Khan, Pakistan',
      season: 'June to July'
    },
    {
      name: 'Fajri',
      description: 'Fajri is a premium Pakistani mango variety with a unique sweet-tart flavor profile. It has a beautiful reddish-yellow skin when ripe and offers juicy, aromatic flesh with minimal fiber.',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      origin: 'Multan, Pakistan',
      season: 'July to August'
    }
  ];

  return (
    <div className="pt-20 pb-16 bg-gradient-to-b from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 min-h-screen w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 mt-4">
          <div className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full mb-3 font-medium text-sm">
            Explore Varieties
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Premium Mango Collection
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            Discover our handpicked selection of the finest mangoes from around the world, 
            each with its unique flavor profile and characteristics.
          </p>
        </div>
        
        {/* Mango Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-2 sm:px-0">
          {mangoVarieties.map((mango, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <img 
                  src={mango.image} 
                  alt={mango.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold z-20 shadow-lg text-sm">
                  Premium
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{mango.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{mango.description}</p>
                
                <div className="flex flex-col space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="mr-2">🌍</span>
                    <span>Origin: {mango.origin}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="mr-2">🗓️</span>
                    <span>Season: {mango.season}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Link to="/order" className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg font-medium transition-transform duration-300 hover:scale-105">
                    Order Now
                  </Link>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MangoTypes;