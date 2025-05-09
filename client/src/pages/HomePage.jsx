import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import heroImage from '../assets/hero-mango-removebg-preview.png';
import specialOfferImage from '../assets/special_offer.jpg';
import { useCart } from '../context/CartContext';


const Home = () => {
  // State for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const benefitsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const seasonalRef = useRef(null);
  
  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const featuredInView = useInView(featuredRef, { once: false, amount: 0.3 });
  const benefitsInView = useInView(benefitsRef, { once: false, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  const seasonalInView = useInView(seasonalRef, { once: false, amount: 0.3 });
  
  // Animation controls
  const heroControls = useAnimation();
  const featuredControls = useAnimation();
  const benefitsControls = useAnimation();
  const testimonialsControls = useAnimation();
  const ctaControls = useAnimation();
  const seasonalControls = useAnimation();
  
  // Mouse move handler for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Trigger animations when elements come into view
  useEffect(() => {
    if (heroInView) {
      heroControls.start('visible');
    }
    if (featuredInView) {
      featuredControls.start('visible');
    }
    if (benefitsInView) {
      benefitsControls.start('visible');
    }
    if (testimonialsInView) {
      testimonialsControls.start('visible');
    }
    if (ctaInView) {
      ctaControls.start('visible');
    }
    if (seasonalInView) {
      seasonalControls.start('visible');
    }
  }, [heroInView, featuredInView, benefitsInView, testimonialsInView, ctaInView, seasonalInView,
      heroControls, featuredControls, benefitsControls, testimonialsControls, ctaControls, seasonalControls]);
  
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
  
  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      } 
    }
  };
  
  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      } 
    }
  };
  
  const rotateIn = {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };
  
  // Featured mangoes data
  const featuredMangoes = [
    {
      id: 1,
      name: "Sindhri",
      description: "Known as the \"King of Mangoes\" in Pakistan, Sindhri is renowned for its rich, sweet flavor and distinctive aroma.",
      image: specialOfferImage, // Use imported image
      price: "$5.99"
    },
    {
      id: 2,
      name: "Chaunsa",
      description: "Chaunsa mangoes are prized for their exceptional sweetness and aromatic flavor with a smooth, fiber-free pulp.",
      image: specialOfferImage, // Use imported image
      price: "$4.99"
    },
    {
      id: 3,
      name: "Langra",
      description: "Langra mangoes have a distinct taste that combines sweetness with a slight tanginess and fiber-free, aromatic flesh.",
      image: specialOfferImage, // Use imported image
      price: "$6.49"
    }
  ];
  
  // Add to cart function
  const { addItem } = useCart();
  
  // Add to cart function
  const handleAddToCart = (product) => {
    addItem(product);
    
    // Show a temporary success message
    alert(`${product.name} added to your cart!`);
  };
  
  // Seasonal special
  const seasonalSpecial = {
    name: "Summer Mango Box",
    description: "Limited edition box with a selection of our premium seasonal mangoes. Perfect for gifting or treating yourself to a tropical delight.",
    image: specialOfferImage,
    price: "$24.99",
    features: [
      "6 Premium Mangoes",
      "Handpicked Selection",
      "Gift Packaging",
      "Recipe Booklet Included"
    ]
  };
  
  // Benefits data
  const benefits = [
    {
      id: 1,
      icon: "🌱",
      title: "Organically Grown",
      description: "Our mangoes are grown using organic farming practices, free from harmful pesticides."
    },
    {
      id: 2,
      icon: "🚚",
      title: "Fast Delivery",
      description: "We deliver fresh mangoes to your doorstep within 24-48 hours of harvesting."
    },
    {
      id: 3,
      icon: "💯",
      title: "Quality Guaranteed",
      description: "We guarantee the quality and freshness of our mangoes or your money back."
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      quote: "The Alphonso mangoes were absolutely divine! The sweetest I've ever tasted.",
      avatar: "/assets/avatar1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      quote: "Fast delivery and excellent packaging. The mangoes arrived in perfect condition.",
      avatar: "/assets/avatar2.jpg"
    },
    {
      id: 3,
      name: "Priya Sharma",
      quote: "I've been ordering from MangoStore for years. Their quality is consistently outstanding.",
      avatar: "/assets/avatar3.jpg"
    }
  ];

  return (
    <div className="pt-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={fadeInUp}
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-10"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-20 dark:opacity-10"></div>
          <motion.div 
            className="absolute -bottom-16 -right-16 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
          <motion.div 
            className="absolute -top-16 -left-16 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          ></motion.div>
          
          {/* Floating mango particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-yellow-300 opacity-20"
                style={{
                  width: Math.random() * 30 + 10,
                  height: Math.random() * 30 + 10,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  rotate: [0, Math.random() * 360],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 w-full">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
              variants={fadeInUp}
            >
              Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Sweetest</span> Mangoes
            </motion.h1>
            <motion.p 
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300"
              variants={fadeInUp}
            >
              Experience the rich, tropical flavor of premium quality mangoes delivered fresh to your doorstep.
            </motion.p>
        
            <motion.div 
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              variants={fadeInUp}
            >
              <motion.button 
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/order'}
              >
                Shop Now
              </motion.button>
              <motion.button 
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/mango-types'}
              >
                Learn More
              </motion.button>
            </motion.div>

          </div>

          <div className="md:w-1/2 relative pl-0 sm:pl-10 md:pl-16 w-full mt-4 md:mt-0">
            <motion.div
              initial={{ rotate: -5, y: 20 }}
              animate={{ 
                rotate: 5, 
                y: -20,
                x: mousePosition.x * 20,
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              className="relative z-10"
            >
             
              <motion.img 
                src={heroImage} alt="Delicious Mango" 
                className="max-w-full h-auto rounded-lg shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              
              {/* Floating juice drops */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-yellow-400 rounded-full opacity-70"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                  }}
                  animate={{
                    y: [0, 30],
                    opacity: [0.7, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </motion.div>
            <motion.div 
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-300 rounded-full opacity-30 dark:opacity-20 z-0"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            ></motion.div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-5 -left-5 w-20 h-20 bg-green-300 rounded-full opacity-40 z-0"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, 0],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            ></motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
          }}
        >
          <svg className="w-6 h-10 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </motion.section>
      
      {/* Seasonal Special Section */}
      <motion.section
        ref={seasonalRef}
        initial="hidden"
        animate={seasonalControls}
        variants={staggerChildren}
        className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
            variants={fadeInUp}
          >
            <motion.div 
              className="md:w-1/2 w-full relative mb-8 md:mb-0"
              variants={slideIn}
            >
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 z-10"
                  whileHover={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
                <motion.img 
                  src={seasonalSpecial.image} 
                  alt={seasonalSpecial.name}
                  className="w-full h-auto object-cover max-h-[400px]"
                />
                <motion.div
                  className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold z-20 shadow-lg text-sm sm:text-base"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 0, 5, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >
                  Limited Edition
                </motion.div>
              </motion.div>
              
              {/* Decorative elements - hidden on mobile */}
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 z-0 hidden md:block"
                animate={{ 
                  scale: [1, 1.2, 1],
                  x: [0, 10, 0],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              ></motion.div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 w-full"
              variants={slideInRight}
            >
              <motion.div
                className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full mb-3 md:mb-4 font-medium text-sm"
                whileHover={{ scale: 1.05 }}
              >
                Seasonal Special
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-6">{seasonalSpecial.name}</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 md:mb-8">{seasonalSpecial.description}</p>
              
              <ul className="space-y-2 mb-4 md:mb-8">
                {seasonalSpecial.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300 text-sm sm:text-base"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    <motion.span 
                      className="mr-2 text-yellow-500"
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.2
                      }}
                    >
                      ✓
                    </motion.span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              
              <div className="flex flex-wrap items-center mb-4 md:mb-8">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{seasonalSpecial.price}</span>
                <span className="ml-2 sm:ml-3 text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 line-through">$34.99</span>
                <span className="ml-2 sm:ml-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded text-xs sm:text-sm font-medium">Save $10</span>
              </div>
              
              <motion.button 
                className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 w-full md:w-auto"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(seasonalSpecial)}
              >
                Add to Cart
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Featured Mangoes Section */}
      <motion.section 
        ref={featuredRef}
        initial="hidden"
        animate={featuredControls}
        variants={staggerChildren}
        className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Featured Mangoes</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4"></div>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our handpicked selection of the finest mangoes from around the world.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredMangoes.map((mango, index) => (
              <motion.div 
                key={mango.id}
                variants={fadeInScale}
                whileHover={{ y: -10 }}
                custom={index}
                transition={{
                  delay: index * 0.2,
                }}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img 
                    src={mango.image} 
                    alt={mango.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <p className="text-white font-bold text-xl">{mango.price}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{mango.name}</h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">{mango.description}</p>
                  <motion.button 
                    className="mt-6 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg transform hover:scale-105 transition duration-300 w-full"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-10">
            <motion.a
              href="/mango-types"
              className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Mangoes
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Benefits Section */}
      <motion.section 
        ref={benefitsRef}
        initial="hidden"
        animate={benefitsControls}
        variants={staggerChildren}
        className="py-16 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 dark:bg-yellow-900/20 rounded-full opacity-50 dark:opacity-20 -mr-48 -mt-48"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100 dark:bg-orange-900/20 rounded-full opacity-50 dark:opacity-20 -ml-40 -mb-40"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -10, 0],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        ></motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center mb-10 sm:mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Why Choose Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4"></div>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to providing the best mango experience with quality, freshness, and exceptional service.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.id}
                variants={rotateIn}
                custom={index}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
              >
                <motion.div 
                  className="text-4xl sm:text-5xl mb-4 sm:mb-6"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0, -10, 0],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 1
                  }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      
           {/* Testimonials Section */}
           <motion.section 
        ref={testimonialsRef}
        initial="hidden"
        animate={testimonialsControls}
        variants={staggerChildren}
        className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4"></div>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what mango lovers have to say about our products.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                variants={fadeInScale}
                custom={index}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 p-8 relative"
              >
                {/* Decorative elements */}
                <motion.div 
                  className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 rounded-full opacity-10 -mr-10 -mt-10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ 
                    duration: 5 + index, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                ></motion.div>
                
                <div className="flex items-center mb-6">
                  <div className="relative mr-4">
                    <motion.img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                      whileHover={{ scale: 1.1 }}
                    />
                    <motion.div 
                      className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 border-2 border-white dark:border-gray-700"
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    ></motion.div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-yellow-500">Verified Customer</p>
                  </div>
                </div>
                
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 fill-current" 
                      viewBox="0 0 24 24"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i + 0.3 }}
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </motion.svg>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    className="text-gray-600 dark:text-gray-300 relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    <svg className="absolute top-0 left-0 w-8 h-8 text-yellow-400 opacity-20 transform -translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="italic">{testimonial.quote}</p>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <p>Purchased: Alphonso Mangoes</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            variants={fadeInUp}
          >
            <motion.button 
              className="px-6 py-2 border border-yellow-500 text-yellow-500 dark:text-yellow-400 dark:border-yellow-400 rounded-lg hover:bg-yellow-500 hover:text-white dark:hover:bg-yellow-400 dark:hover:text-gray-900 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Reviews
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Benefits Section (Duplicate - Removed) */}
      
      {/* CTA Section */}
      <motion.section 
        ref={ctaRef}
        initial="hidden"
        animate={ctaControls}
        variants={fadeInUp}
        className="py-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          {/* Animated background elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: Math.random() * 50 + 10,
                height: Math.random() * 50 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() + 0.5, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
            >
              Ready to Experience Mango Paradise?
            </motion.h2>
            <motion.p 
              className="text-xl mb-10 opacity-90"
              variants={fadeInUp}
            >
              Join thousands of satisfied customers and treat yourself to nature's sweetest gift.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              variants={fadeInUp}
            >
              <motion.button 
                className="px-8 py-4 bg-white text-orange-500 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
              <motion.button 
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h3 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Stay Updated
            </motion.h3>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Subscribe to our newsletter for seasonal updates, exclusive offers, and mango recipes.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-grow"
              />
              <motion.button 
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;