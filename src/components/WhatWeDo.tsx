import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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
import { withPerformanceTracking } from '@/components/withPerformanceTracking';
import { useOptimizedHandler } from '@/utils/optimizationUtils';

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

  // Memoize mouse move handler
  const handleMouseMove = useOptimizedHandler((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      mouseX.set(x - rect.width / 2);
      mouseY.set(y - rect.height / 2);
    }
  }, { throttleMs: 16 });

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  // Memoize animation variants
  const cardVariants = useMemo(() => ({
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
  }), []);

  const glowVariants = useMemo(() => ({
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
  }), []);

  // Memoize product and service handlers
  const handleProductHover = useCallback((id: string | null) => {
    setActiveProduct(id);
  }, []);

  const handleServiceHover = useCallback((id: string) => {
    setActiveService(id);
  }, []);

  // Memoize active product and service data
  const activeProductData = useMemo(() => 
    products.find(p => p.id === activeProduct),
    [activeProduct]
  );

  const activeServiceData = useMemo(() => 
    services.find(s => s.id === activeService),
    [activeService]
  );

  // Memoize product cards
  const productCards = useMemo(() => 
    products.map((product, index) => (
      <motion.div
        key={product.id}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        custom={index}
        className={cn(
          "relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10",
          "hover:bg-white/10 transition-colors duration-300",
          "cursor-pointer group"
        )}
        onHoverStart={() => handleProductHover(product.id)}
        onHoverEnd={() => handleProductHover(null)}
      >
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-3 rounded-lg bg-white/5",
            "group-hover:bg-white/10 transition-colors duration-300"
          )}>
            <product.icon className={cn("w-6 h-6", product.iconColor)} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-white/70">{product.description}</p>
          </div>
        </div>
      </motion.div>
    )),
    [cardVariants, handleProductHover]
  );

  // Memoize service cards
  const serviceCards = useMemo(() => 
    services.map((service, index) => (
      <motion.div
        key={service.id}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        custom={index}
        className={cn(
          "relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10",
          "hover:bg-white/10 transition-colors duration-300",
          "cursor-pointer group"
        )}
        onHoverStart={() => handleServiceHover(service.id)}
      >
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-3 rounded-lg bg-white/5",
            "group-hover:bg-white/10 transition-colors duration-300"
          )}>
            <service.icon className={cn("w-6 h-6", service.iconColor)} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-white/70">{service.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.industries.map(industry => (
                <span
                  key={industry}
                  className="px-2 py-1 text-sm rounded-full bg-white/5 text-white/70"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )),
    [cardVariants, handleServiceHover]
  );

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
        }}
      >
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
          style={{
            x: '-50%',
            y: '-50%',
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What We Do
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with expert development to create
              innovative solutions that drive business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Our Products</h3>
              <div className="space-y-4">
                {productCards}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Our Services</h3>
              <div className="space-y-4">
                {serviceCards}
              </div>
            </div>
          </div>

          {activeProductData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h4 className="text-xl font-semibold mb-2">Use Case</h4>
              <p className="text-white/70">{activeProductData.useCase}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default withPerformanceTracking(WhatWeDo, 'WhatWeDo');
