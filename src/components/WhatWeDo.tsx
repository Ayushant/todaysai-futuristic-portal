
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  ArrowRight, 
  Code, 
  Smartphone, 
  Zap, 
  Brain, 
  Sparkles,
  Puzzle,
  FileText,
  Eye,
  Volume2,
  Monitor,
  Cog,
  BarChart3,
  RotateCcw,
  Users
} from 'lucide-react';

// Define product and service types
type Product = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  useCase: string;
};

type Service = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  industries: string[];
};

const products: Product[] = [
  {
    id: 'codex',
    name: 'Codex AI',
    description: 'Advanced code assistant that writes, refactors, and explains code in 20+ programming languages.',
    icon: Puzzle,
    iconColor: 'text-purple-400',
    useCase: 'Boosting developer productivity by 40% with contextual code suggestions and automated debugging.',
  },
  {
    id: 'docai',
    name: 'DocMind',
    description: 'Intelligent document analysis that extracts, summarizes, and categorizes information.',
    icon: FileText,
    iconColor: 'text-blue-400',
    useCase: 'Processing legal documents 8x faster with 99.2% accuracy for compliance verification.',
  },
  {
    id: 'visionapi',
    name: 'VisionCore API',
    description: 'Computer vision API for object detection, facial recognition, and scene analysis.',
    icon: Eye,
    iconColor: 'text-emerald-400',
    useCase: 'Enabling touchless retail experiences with 98.7% accurate customer identification.',
  },
  {
    id: 'audioai',
    name: 'WaveSync',
    description: 'Real-time audio processing, transcription, and multi-language translation.',
    icon: Volume2,
    iconColor: 'text-orange-400',
    useCase: 'Powering multilingual virtual events with instant translations across 42 languages.',
  },
];

const services: Service[] = [
  {
    id: 'webdev',
    name: 'Web Development',
    description: 'Full-stack web solutions with modern frameworks, responsive designs, and cloud integration for businesses of all sizes.',
    icon: Monitor,
    iconColor: 'text-cyan-400',
    industries: ['E-commerce', 'FinTech', 'Healthcare', 'Education'],
  },
  {
    id: 'appdev',
    name: 'App Development',
    description: 'Native and cross-platform mobile applications with seamless UX/UI, backend integration, and advanced features.',
    icon: Smartphone,
    iconColor: 'text-pink-400',
    industries: ['Retail', 'Logistics', 'Social Media', 'Fitness'],
  },
  {
    id: 'aidev',
    name: 'AI Development',
    description: 'Full-cycle AI solution development from concept to deployment, including model training and integration.',
    icon: Cog,
    iconColor: 'text-purple-400',
    industries: ['Healthcare', 'Finance', 'Manufacturing'],
  },
  {
    id: 'dataconsult',
    name: 'Data Strategy',
    description: 'Data architecture design, optimization of data pipelines, and implementing data governance frameworks.',
    icon: BarChart3,
    iconColor: 'text-green-400',
    industries: ['Retail', 'Telecom', 'Insurance'],
  },
  {
    id: 'aiops',
    name: 'AI Operations',
    description: 'Continuous monitoring, optimization, and scaling of AI models in production environments.',
    icon: RotateCcw,
    iconColor: 'text-yellow-400',
    industries: ['Logistics', 'Energy', 'E-commerce'],
  },
  {
    id: 'teamaas',
    name: 'AI Team as a Service',
    description: 'On-demand access to specialized AI talent, from research scientists to ML engineers.',
    icon: Users,
    iconColor: 'text-indigo-400',
    industries: ['Startups', 'Education', 'Media'],
  },
];

const WhatWeDo = () => {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [activeService, setActiveService] = useState('webdev');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        mouseX.set(x - rect.width / 2);
        mouseY.set(y - rect.height / 2);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: [0, 1, 0], 
      scale: [0.8, 1.2, 0.8],
      transition: { 
        duration: 3, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };    return (
    <motion.section 
      ref={containerRef}
      className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-800" 
      id="products"
      style={{ opacity }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.1),transparent_70%)]"></div>
      
      {/* Premium Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Animated gradient orbs with premium glow */}
      <motion.div 
        className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 blur-2xl"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Premium floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full shadow-lg"
          style={{
            left: `${10 + i * 8}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [-20, 20],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 4 + (i % 3),
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Interactive premium glow effect */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-10"
            style={{
              left: mouseXSpring,
              top: mouseYSpring,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.1) 30%, rgba(236,72,153,0.05) 60%, transparent 100%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      
      <div className="container px-4 mx-auto relative z-10">        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Premium Header with enhanced styling */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 px-12 py-6 shadow-2xl">              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                What We Do
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12"
                  variants={glowVariants}
                  initial="initial"
                  animate="animate"
                >
                  <Sparkles className="w-full h-full text-purple-400 drop-shadow-lg" />
                </motion.div>
                
                {/* Premium text shadow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent blur-lg opacity-50 -z-10">
                  What We Do
                </div>
              </motion.h2>
            </div>
          </div>
          
          <motion.p 
            className="text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            The perfect synergy of groundbreaking products and expert services,
            <span className="text-white font-medium"> designed to transform </span>
            how businesses leverage artificial intelligence.
          </motion.p>
          
          {/* Premium decorative line */}
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          />
        </motion.div>
          <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          style={{ y }}
        >          {/* Products Column - Enhanced Premium Design */}
          <motion.div 
            className="relative overflow-hidden"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Premium section header */}
            <motion.div 
              className="relative mb-8 p-6 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Brain className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white relative">
                      <motion.span 
                        className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                        whileHover={{ 
                          textShadow: "0 0 20px rgba(147, 51, 234, 0.8)",
                          transition: { duration: 0.3 }
                        }}
                      >
                        Premium Products
                      </motion.span>
                    </h3>
                    <p className="text-gray-300/80 text-sm">The Logic Core</p>
                  </div>
                </div>
                <motion.div 
                  className="h-px w-20 bg-gradient-to-r from-transparent via-purple-500 to-blue-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product, index) => (                <motion.div 
                  key={product.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                  className={cn(
                    "relative group cursor-pointer transition-all duration-500",
                    "bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl",
                    "border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden",
                    "hover:border-purple-500/30 hover:shadow-purple-500/20",
                    activeProduct === product.id ? "border-purple-500/50 shadow-lg shadow-purple-500/25" : ""
                  )}
                  onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)}
                >
                  {/* Premium card glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"
                    layoutId={`product-glow-${product.id}`}
                  />
                  
                  {/* Animated premium border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: `conic-gradient(from 0deg, transparent, ${activeProduct === product.id ? '#8B5CF6' : '#6366F1'}, transparent)`
                    }}
                    animate={{ rotate: activeProduct === product.id ? 360 : 0 }}
                    transition={{ duration: 3, repeat: activeProduct === product.id ? Infinity : 0, ease: "linear" }}
                  />
                  
                  {/* Premium shimmer effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <motion.div 
                        className={cn(
                          "w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm",
                          "border border-white/20 flex items-center justify-center relative overflow-hidden",
                          "shadow-xl group-hover:shadow-2xl transition-all duration-500"
                        )}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {/* Enhanced icon glow effect */}
                        <motion.div
                          className={cn(
                            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100",
                            product.iconColor.replace('text-', 'bg-').replace('-400', '-500/30')
                          )}
                          transition={{ duration: 0.5 }}
                        />
                        
                        <product.icon 
                          className={cn("w-8 h-8 relative z-10", product.iconColor, "drop-shadow-lg")}
                        />
                        
                        {/* Premium rotating border */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100"
                          style={{
                            borderImage: `conic-gradient(from 0deg, ${
                              product.iconColor.includes('purple') ? '#a855f7' :
                              product.iconColor.includes('blue') ? '#60a5fa' :
                              product.iconColor.includes('emerald') ? '#34d399' : '#fb923c'
                            }, transparent, ${
                              product.iconColor.includes('purple') ? '#a855f7' :
                              product.iconColor.includes('blue') ? '#60a5fa' :
                              product.iconColor.includes('emerald') ? '#34d399' : '#fb923c'
                            }) 1`
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                      
                      <motion.div 
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-all duration-500 border border-white/10"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          animate={{ rotate: activeProduct === product.id ? 90 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <ArrowRight size={18} className="text-white/70 group-hover:text-white transition-colors" />
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    <motion.h4 
                      className="text-xl font-bold mb-2 text-white"
                      layoutId={`product-title-${product.id}`}
                    >
                      {product.name}
                    </motion.h4>
                    
                    <AnimatePresence mode="wait">
                      {activeProduct === product.id ? (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <motion.p 
                            className="text-white/70 mb-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            {product.description}
                          </motion.p>
                          <motion.div 
                            className="mt-4 bg-white/5 p-3 rounded-lg backdrop-blur-sm"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <p className="text-sm text-white/90">
                              <span className="text-techpurple font-semibold">Use Case: </span>
                              {product.useCase}
                            </p>
                          </motion.div>
                          <motion.a 
                            href="#contact" 
                            className="inline-flex items-center text-techpurple hover:text-techpurple-light mt-4 text-sm group/link"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ x: 5 }}
                          >
                            Learn more 
                            <motion.div
                              className="ml-1"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight size={14} />
                            </motion.div>
                          </motion.a>
                        </motion.div>
                      ) : (
                        <motion.p 
                          key="collapsed"
                          className="text-white/70 line-clamp-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {product.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Enhanced Decorative "Left Brain" elements */}
            <motion.div 
              className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border border-dashed border-techpurple/20 opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full border border-dashed border-techpurple/30 opacity-50"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [-10, 10] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-techpurple/20 to-techpurple/10 backdrop-blur-sm border border-techpurple/30 flex items-center justify-center"
                whileHover={{ scale: 1.2, rotate: 15 }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity },
                  hover: { type: "spring", stiffness: 400 }
                }}
              >
                <Zap className="w-4 h-4 text-techpurple" />
              </motion.div>
            </motion.div>
          </motion.div>
            {/* Services Column - Right Brain */}
          <motion.div 
            className="relative" 
            id="services"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div 
              className="flex justify-between items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white relative">
                <motion.span 
                  className="text-elecblue"
                  whileHover={{ 
                    textShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
                    transition: { duration: 0.3 }
                  }}
                >
                  Services
                </motion.span> | The Creative Core
                <motion.div
                  className="absolute -top-2 -right-8"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-elecblue/60" />
                </motion.div>
              </h3>
              <motion.div 
                className="h-px w-16 bg-gradient-to-r from-transparent to-elecblue"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </motion.div>
            
            {/* Enhanced Service tabs */}
            <motion.div 
              className="flex mb-6 overflow-x-auto hide-scrollbar relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  className={cn(
                    "px-4 py-2 whitespace-nowrap transition-all duration-300 relative",
                    activeService === service.id
                      ? "text-white"
                      : "text-white/60 hover:text-white/80"
                  )}
                  onClick={() => setActiveService(service.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {service.name}
                  {activeService === service.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-elecblue to-techpurple"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {activeService === service.id && (
                    <motion.div
                      className="absolute inset-0 bg-elecblue/10 rounded-lg -z-10"
                      layoutId="activeTabBg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Enhanced Active service details */}
            <AnimatePresence mode="wait">
              {services.map((service) => (
                activeService === service.id && (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="glass-card p-6 relative overflow-hidden"
                  >
                    {/* Service card glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-elecblue/5 via-transparent to-techpurple/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    <div className="relative z-10">                      <motion.div 
                        className="flex items-center mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >                        <motion.div 
                          className={cn(
                            "w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm",
                            "border border-white/20 flex items-center justify-center mr-4 relative overflow-hidden",
                            "shadow-xl group-hover:shadow-2xl transition-all duration-500"
                          )}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                        >
                          {/* Service icon glow effect */}
                          <motion.div
                            className={cn(
                              "absolute inset-0 rounded-2xl opacity-0",
                              service.iconColor.replace('text-', 'bg-').replace('-400', '-500/30')
                            )}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          {/* Enhanced shimmer effect */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                            animate={{ 
                              x: ['0%', '200%'] 
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity, 
                              repeatDelay: 2 
                            }}
                          />
                          
                          {/* Pulse ring effect */}
                          <motion.div
                            className={cn(
                              "absolute inset-0 rounded-2xl border-2 opacity-0",
                              service.iconColor.replace('text-', 'border-')
                            )}
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              repeatDelay: 1
                            }}
                          />
                          
                          <service.icon 
                            className={cn("w-8 h-8 relative z-10", service.iconColor)}
                          />
                          
                          {/* Animated particles around icon */}
                          {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className={cn(
                                "absolute w-1.5 h-1.5 rounded-full",
                                service.iconColor.replace('text-', 'bg-').replace('-400', '-300')
                              )}
                              style={{
                                left: `${25 + i * 20}%`,
                                top: `${15 + i * 30}%`,
                              }}
                              animate={{ 
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                                rotate: [0, 180, 360]
                              }}
                              transition={{ 
                                duration: 2.5, 
                                repeat: Infinity, 
                                delay: i * 0.4 
                              }}
                            />
                          ))}
                        </motion.div>
                        <motion.h4 
                          className="text-2xl font-bold text-white"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {service.name}
                        </motion.h4>
                      </motion.div>
                      
                      <motion.p 
                        className="text-white/80 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {service.description}
                      </motion.p>
                      
                      <motion.div 
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h5 className="text-sm uppercase text-white/50 mb-3">Industries</h5>                        <div className="flex flex-wrap gap-2">
                          {service.industries.map((industry, index) => (
                            <motion.span 
                              key={industry} 
                              className={cn(
                                "bg-white/5 border border-white/10 rounded-full px-3 py-1 text-sm text-white/80",
                                "hover:bg-white/10 transition-all duration-300 cursor-default relative overflow-hidden",
                                "backdrop-blur-sm shadow-sm hover:shadow-md"
                              )}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              whileHover={{ 
                                scale: 1.05, 
                                borderColor: "rgba(255,255,255,0.3)",
                                boxShadow: `0 0 20px ${
                                  service.iconColor.includes('cyan') ? 'rgba(34, 211, 238, 0.3)' :
                                  service.iconColor.includes('pink') ? 'rgba(244, 114, 182, 0.3)' :
                                  service.iconColor.includes('purple') ? 'rgba(168, 85, 247, 0.3)' :
                                  service.iconColor.includes('green') ? 'rgba(74, 222, 128, 0.3)' :
                                  service.iconColor.includes('yellow') ? 'rgba(250, 204, 21, 0.3)' :
                                  'rgba(129, 140, 248, 0.3)'
                                }`
                              }}
                            >
                              {/* Subtle shimmer effect on hover */}
                              <motion.div
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                                whileHover={{ x: '200%' }}
                                transition={{ duration: 0.6 }}
                              />
                              <span className="relative z-10">{industry}</span>
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                      
                      {(service.id === 'webdev' || service.id === 'appdev') && (
                        <motion.div 
                          className="mb-6 bg-white/5 p-4 rounded-lg border border-elecblue/20 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <h5 className="text-sm uppercase text-elecblue mb-3 flex items-center">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="mr-2"
                            >
                              <Code className="w-4 h-4" />
                            </motion.div>
                            Expert Team
                          </h5>
                          <p className="text-white/80 text-sm">
                            Our dedicated team of {service.id === 'webdev' ? 'web' : 'app'} development experts brings years of 
                            industry experience with cutting-edge technologies and frameworks to deliver robust, 
                            scalable, and user-friendly solutions tailored to your business needs.
                          </p>
                        </motion.div>
                      )}
                        <motion.a 
                        href="#contact" 
                        className={cn(
                          "btn-secondary inline-flex items-center text-sm group/cta relative overflow-hidden",
                          "bg-gradient-to-r from-elecblue/20 to-techpurple/20 backdrop-blur-sm",
                          "border border-white/20 rounded-lg px-6 py-3 transition-all duration-300",
                          "hover:border-white/40 hover:shadow-lg hover:shadow-elecblue/20"
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Enhanced glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-elecblue/30 to-techpurple/30 opacity-0 group-hover/cta:opacity-100 transition-opacity rounded-lg"
                          initial={false}
                        />
                        
                        {/* Animated border */}
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-elecblue via-techpurple to-elecblue bg-[length:200%_100%]"
                          style={{ 
                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            maskComposite: 'exclude',
                            padding: '1px'
                          }}
                          animate={{ 
                            backgroundPosition: ['0% 0%', '200% 0%'] 
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: 'linear' 
                          }}
                        />
                        
                        <span className="relative z-10 font-medium">Request Consultation</span>
                        <motion.div
                          className="ml-2 relative z-10"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </motion.a>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {/* Enhanced Decorative "Right Brain" elements */}
            <motion.div 
              className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full border border-dashed border-elecblue/20 opacity-30"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full border border-dashed border-elecblue/30 opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />            <motion.div
              className="absolute -top-8 right-1/4"
              animate={{ 
                y: [-15, 15],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, repeatType: "reverse" },
                rotate: { duration: 6, repeat: Infinity }
              }}
            >
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-elecblue/20 to-elecblue/10 backdrop-blur-sm border border-elecblue/30 flex items-center justify-center"
                whileHover={{ scale: 1.2, rotate: -15 }}
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 0 8px rgba(59, 130, 246, 0.1)",
                    "0 0 0 0 rgba(59, 130, 246, 0)"
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 2, repeat: Infinity },
                  hover: { type: "spring", stiffness: 400 }
                }}
              >
                <Smartphone className="w-4 h-4 text-elecblue" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>      </div>
    </motion.section>
  );
};

export default WhatWeDo;
