
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Globe, Users, Award, TrendingUp, MapPin, Target } from 'lucide-react';

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

const timelineItems: TimelineItem[] = [
  {
    year: '2025',
    title: 'Founded in Pune',
    description: 'Started as an AI research lab with our elite team of engineers, focusing on cutting-edge machine learning solutions'
  },
  {
    year: '2026',
    title: 'First Product Launch',
    description: 'Released VisionCore API, revolutionizing how businesses implement advanced image recognition and computer vision'
  },
  {
    year: '2027',
    title: 'Global Expansion',
    description: 'Established R&D centers across India, Singapore, and Germany, creating a truly international AI innovation network'
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // Mouse tracking for premium glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const glowVariants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: { 
      scale: [1, 1.2, 1], 
      opacity: [0.6, 1, 0.6],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };
  return (
    <motion.section 
      id="about" 
      className="py-20 relative overflow-hidden bg-navy-200/30"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Enhanced Premium Background */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      
      {/* Premium animated orbs */}
      <motion.div 
        className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-techpurple/20 to-purple-500/20 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-neon-blue/20 to-blue-500/20 blur-3xl"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Premium floating particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-techpurple to-neon-blue rounded-full shadow-lg"
          style={{
            left: `${5 + i * 6}%`,
            top: `${10 + (i % 5) * 20}%`,
          }}
          animate={{
            y: [-30, 30],
            opacity: [0.2, 1, 0.2],
            scale: [0.3, 1, 0.3]
          }}
          transition={{ 
            duration: 5 + (i % 4),
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.4,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Interactive premium glow effect */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-10"
            style={{
              left: mouseXSpring,
              top: mouseYSpring,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.08) 30%, rgba(34,211,238,0.04) 60%, transparent 100%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>      
      <div className="container px-4 mx-auto relative z-10">
        {/* Premium Header Section */}
        <motion.div 
          className="text-center mb-20 max-w-4xl mx-auto"
          variants={cardVariants}
        >
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-techpurple/20 via-neon-blue/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 px-12 py-6 shadow-2xl">
              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-techpurple-light to-neon-blue bg-clip-text text-transparent relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                About atkind
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12"
                  variants={glowVariants}
                  initial="initial"
                  animate="animate"
                >
                  <Brain className="w-full h-full text-techpurple drop-shadow-lg" />
                </motion.div>
                
                {/* Premium text shadow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-techpurple via-neon-blue to-purple-500 bg-clip-text text-transparent blur-lg opacity-50 -z-10">
                  About atkind
                </div>
              </motion.h2>
            </div>
          </div>
          
          <motion.p 
            className="text-xl text-gray-300/90 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            From humble beginnings in Pune to a global AI innovator, our journey is fueled by 
            <span className="text-white font-medium"> relentless passion </span>
            for creating intelligent technologies that solve real-world problems and
            <span className="text-techpurple font-medium"> transform industries</span>.
          </motion.p>
          
          {/* Premium decorative line */}
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-techpurple to-transparent mx-auto mt-8"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          />
        </motion.div>        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Company Description */}
          <motion.div 
            className="relative overflow-hidden"
            variants={cardVariants}
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Premium glass card with enhanced effects */}
            <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Premium glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-techpurple/10 via-neon-blue/5 to-purple-500/10 opacity-0 transition-opacity duration-700 rounded-3xl"
                animate={{ opacity: activeCard === 0 ? 1 : 0 }}
              />
              
              {/* Animated premium border */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0"
                style={{
                  background: `conic-gradient(from 0deg, transparent, ${activeCard === 0 ? '#8B5CF6' : '#6366F1'}, transparent)`
                }}
                animate={{ 
                  opacity: activeCard === 0 ? 1 : 0,
                  rotate: activeCard === 0 ? 360 : 0 
                }}
                transition={{ duration: 3, repeat: activeCard === 0 ? Infinity : 0, ease: "linear" }}
              />
              
              {/* Premium shimmer effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
                animate={{ 
                  x: activeCard === 0 ? ['-100%', '100%'] : ['-100%', '-100%'],
                  opacity: activeCard === 0 ? [0, 1, 0] : 0
                }}
                transition={{ duration: 2, repeat: activeCard === 0 ? Infinity : 0, ease: "easeInOut" }}
              />
              
              <div className="relative z-10">
                {/* Enhanced header with icon */}
                <motion.div 
                  className="flex items-center mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-techpurple to-neon-blue rounded-2xl flex items-center justify-center mr-4 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Target className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white">
                    <motion.span 
                      className="bg-gradient-to-r from-techpurple to-neon-blue bg-clip-text text-transparent"
                      whileHover={{ 
                        textShadow: "0 0 20px rgba(139, 92, 246, 0.8)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      Your AI Partner
                    </motion.span>
                  </h3>
                </motion.div>
                
                {/* Enhanced content sections */}
                <div className="space-y-6">
                  <motion.p 
                    className="text-white/90 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-techpurple font-semibold">Atkind</span> was founded with a clear mission: to democratize advanced AI technologies and make them accessible
                    to organizations of all sizes. Based in <span className="text-neon-blue font-medium">Pune's innovation hub</span>, we combine deep technical expertise with a
                    thorough understanding of business challenges.
                  </motion.p>
                  
                  <motion.p 
                    className="text-white/90 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Our team of <span className="text-techpurple font-semibold">10+ AI specialists</span>, data scientists, and engineers work at the cutting edge of machine learning,
                    computer vision, and natural language processing. We're committed to <span className="text-neon-green font-medium">responsible AI development</span> that considers
                    ethical implications and prioritizes transparency.
                  </motion.p>
                  
                  <motion.p 
                    className="text-white/90 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    With <span className="text-elecblue font-semibold">R&D centers in India, Singapore, and Germany</span>, we blend diverse perspectives to create AI solutions that
                    work across cultural and geographical boundaries. Our global approach enables us to deliver technologies that
                    are both <span className="text-purple-400 font-medium">innovative and inclusive</span>.
                  </motion.p>
                </div>
            
                {/* Enhanced Statistics Grid */}
                <motion.div 
                  className="mt-8 grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="relative p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 text-center overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-techpurple/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="relative z-10">
                      <motion.h4 
                        className="text-4xl font-bold text-techpurple mb-2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        10+
                      </motion.h4>
                      <p className="text-white/70 text-sm font-medium flex items-center justify-center">
                        <Users className="w-4 h-4 mr-1" />
                        AI Experts
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="relative p-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 text-center overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-neon-green/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="relative z-10">
                      <motion.h4 
                        className="text-4xl font-bold text-neon-green mb-2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        10+
                      </motion.h4>
                      <p className="text-white/70 text-sm font-medium flex items-center justify-center">
                        <Award className="w-4 h-4 mr-1" />
                        AI Solutions
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Premium CTA section */}
                <motion.div 
                  className="mt-8 p-4 bg-gradient-to-r from-techpurple/10 to-neon-blue/10 rounded-xl border border-techpurple/30"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-white font-semibold mb-1">Ready to innovate?</h5>
                      <p className="text-white/70 text-sm">Let's build the future together</p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TrendingUp className="w-8 h-8 text-techpurple" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>          
          {/* Enhanced Premium Timeline */}
          <motion.div 
            ref={ref} 
            className="relative pl-8"
            variants={cardVariants}
            onMouseEnter={() => setActiveCard(1)}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Enhanced timeline line with gradient */}
            <motion.div 
              className="absolute left-0 top-0 w-1 bg-gradient-to-b from-techpurple via-elecblue to-neon-blue rounded-full shadow-lg"
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* Animated pulse along the timeline */}
            <motion.div 
              className="absolute left-0 top-0 w-1 h-8 bg-gradient-to-b from-white to-techpurple rounded-full opacity-80"
              animate={{ 
                y: isInView ? ['0%', '100%', '0%'] : '0%',
                opacity: isInView ? [0.8, 1, 0.8] : 0.8
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="space-y-16">
              {timelineItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  whileHover={{ x: 10 }}
                >
                  {/* Enhanced timeline dot */}
                  <motion.div 
                    className="absolute -left-12 w-8 h-8 rounded-full border-3 border-white bg-gradient-to-br from-techpurple to-neon-blue shadow-xl flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ duration: 0.6, delay: index * 0.3 + 0.5, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.3 }}
                  >
                    {/* Animated ring around the dot */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-techpurple opacity-60"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    />
                    
                    {/* Inner glow effect */}
                    <motion.div
                      className="w-3 h-3 bg-white rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </motion.div>
                  
                  {/* Enhanced content card */}
                  <motion.div 
                    className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl overflow-hidden ml-4"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Card hover glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-techpurple/10 via-transparent to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    />
                    
                    {/* Premium shimmer effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <div className="relative z-10">
                      <div className="mb-2 flex items-center justify-between">
                        <motion.span 
                          className="text-2xl font-bold bg-gradient-to-r from-techpurple to-neon-blue bg-clip-text text-transparent"
                          whileHover={{ scale: 1.1 }}
                        >
                          {item.year}
                        </motion.span>
                        <motion.div
                          className="w-6 h-6 text-techpurple/60"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-full h-full" />
                        </motion.div>
                      </div>
                      <motion.h4 
                        className="text-xl font-semibold text-white mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3 + 0.2 }}
                      >
                        {item.title}
                      </motion.h4>
                      <motion.p 
                        className="text-white/80 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3 + 0.3 }}
                      >
                        {item.description}
                      </motion.p>
                      
                      {/* Progress indicator */}
                      <motion.div 
                        className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.3 + 0.5 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-techpurple to-neon-blue rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(index + 1) * 33.33}%` }}
                          transition={{ duration: 1, delay: index * 0.3 + 0.8 }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* Decorative elements around timeline */}
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              animate={{ 
                y: [-10, 10],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                y: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                rotate: { duration: 4, repeat: Infinity }
              }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-techpurple/20 to-neon-blue/20 backdrop-blur-sm border border-techpurple/30 flex items-center justify-center shadow-xl"
                whileHover={{ scale: 1.2, rotate: 15 }}
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(139, 92, 246, 0)",
                    "0 0 0 12px rgba(139, 92, 246, 0.1)",
                    "0 0 0 0 rgba(139, 92, 246, 0)"
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 2, repeat: Infinity },
                  hover: { type: "spring", stiffness: 400 }
                }}
              >
                <Globe className="w-5 h-5 text-techpurple" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
