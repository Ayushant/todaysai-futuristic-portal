
import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, FileText, Beaker, Zap, Brain, Sparkles, ExternalLink } from 'lucide-react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type ResearchProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  githubUrl?: string;
  paperUrl?: string;
  image: string;
};

const researchProjects: ResearchProject[] = [
  {
    id: 'multimodal',
    title: 'Multimodal Understanding Framework',
    category: 'Ai based resume analyser',
    description: 'A novel approach to integrating visual and textual information for more comprehensive AI understanding.',
    githubUrl: 'https://github.com/Ayushant/resume-insight-ai-lab/',
    // paperUrl: 'https://arxiv.org/abs/2304.xxxxx',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
  },
  {
    id: 'fedlearn',
    title: 'Privacy-Preserving Federated Learning',
    category: 'AI chatbot',
    description: 'Enabling collaborative model training across organizations without sharing sensitive data.',
    githubUrl: 'https://github.com/Ayushant/ai-chatbot',
    // paperUrl: 'https://arxiv.org/abs/2305.xxxxx',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
  },
  {
    id: 'neuromorphic',
    title: ' AI-Powered Log File Analyzer',
    category: 'Neuromorphic Computing Architecture',
    description: 'Brain-inspired computing systems that improve energy efficiency for AI workloads.',
    // paperUrl: 'https://arxiv.org/abs/2306.xxxxx',
    image: 'https://images.unsplash.com/photo-1581089781785-603411fa81e5?w=800&auto=format&fit=crop',
  },
];

const LabShowcase = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  
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
        delayChildren: 0.1
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
      y: -15,
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
  };  return (
    <motion.section 
      id="lab" 
      className="py-20 relative overflow-hidden"
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
        className="absolute bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-neon-purple/20 to-techpurple/20 blur-3xl"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
          x: [0, 60, 0],
          y: [0, -40, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-20 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-elecblue/20 to-neon-green/20 blur-3xl"
        animate={{ 
          scale: [1, 1.6, 1],
          opacity: [0.2, 0.6, 0.2],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      
      {/* Premium floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-neon-purple to-elecblue rounded-full shadow-lg"
          style={{
            left: `${8 + i * 4.5}%`,
            top: `${15 + (i % 6) * 15}%`,
          }}
          animate={{
            y: [-40, 40],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{ 
            duration: 6 + (i % 5),
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
            className="absolute w-[700px] h-[700px] rounded-full pointer-events-none z-10"
            style={{
              left: mouseXSpring,
              top: mouseYSpring,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.08) 30%, rgba(34, 211, 238, 0.04) 60%, transparent 100%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>      
      <div className="container px-4 mx-auto relative z-10">
        {/* Premium Header Section */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          variants={cardVariants}
        >
          <div className="relative">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-techpurple/20 to-elecblue/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 px-8 py-4 shadow-2xl">
                <motion.h2 
                  className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-neon-purple to-elecblue bg-clip-text text-transparent relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Research Lab
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8"
                    variants={glowVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <Beaker className="w-full h-full text-neon-purple drop-shadow-lg" />
                  </motion.div>
                  
                  {/* Premium text shadow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-techpurple to-elecblue bg-clip-text text-transparent blur-lg opacity-50 -z-10">
                    Research Lab
                  </div>
                </motion.h2>
              </div>
            </div>
            
            <motion.p 
              className="text-xl text-gray-300/90 max-w-2xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Exploring the frontiers of artificial intelligence through 
              <span className="text-white font-medium"> cutting-edge research </span>
              and 
              <span className="text-neon-purple font-medium"> open innovation</span>.
            </motion.p>
            
            {/* Premium decorative line */}
            <motion.div
              className="w-24 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent mt-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </div>
          
          <motion.div 
            className="mt-6 md:mt-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.a 
              href="#contact" 
              className="inline-flex items-center bg-gradient-to-r from-neon-purple/20 to-techpurple/20 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 text-white hover:border-white/40 transition-all duration-300 group shadow-lg hover:shadow-neon-purple/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-3">View all research</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="group-hover:translate-x-1 transition-transform"
              >
                <ArrowRight size={16} />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>        
        {/* Enhanced Premium Project Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {researchProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className="relative group h-full flex flex-col overflow-hidden"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Premium glass card with enhanced effects */}
              <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden h-full flex flex-col">
                {/* Premium glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-techpurple/5 to-elecblue/10 opacity-0 transition-opacity duration-700 rounded-3xl"
                  animate={{ opacity: activeProject === project.id ? 1 : 0 }}
                />
                
                {/* Animated premium border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${activeProject === project.id ? '#9333ea' : '#3b82f6'}, transparent)`
                  }}
                  animate={{ 
                    opacity: activeProject === project.id ? 1 : 0,
                    rotate: activeProject === project.id ? 360 : 0 
                  }}
                  transition={{ duration: 3, repeat: activeProject === project.id ? Infinity : 0, ease: "linear" }}
                />
                
                {/* Premium shimmer effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
                  animate={{ 
                    x: activeProject === project.id ? ['-100%', '100%'] : ['-100%', '-100%'],
                    opacity: activeProject === project.id ? [0, 1, 0] : 0
                  }}
                  transition={{ duration: 2, repeat: activeProject === project.id ? Infinity : 0, ease: "easeInOut" }}
                />
                
                {/* Enhanced Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  
                  {/* Image overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category badge */}
                  <motion.div
                    className="absolute top-4 left-4 bg-neon-purple/20 backdrop-blur-sm border border-neon-purple/30 rounded-full px-3 py-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <span className="text-xs text-neon-purple font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                  </motion.div>
                  
                  {/* Floating research icon */}
                  <motion.div
                    className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    animate={{ 
                      rotate: [0, 360],
                      scale: activeProject === project.id ? [1, 1.1, 1] : 1
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <Brain className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                
                {/* Enhanced Content Section */}
                <div className="p-6 flex-1 flex flex-col relative z-10">
                  <motion.h3 
                    className="text-xl font-bold text-white mb-3 group-hover:text-neon-purple transition-colors duration-300"
                    layoutId={`project-title-${project.id}`}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-white/80 text-sm mb-6 flex-1 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    {project.githubUrl && (
                      <motion.a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-white/90 hover:bg-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm shadow-lg group/btn"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <Github className="w-3 h-3" />
                        GitHub Repo
                        <motion.div
                          className="opacity-0 group-hover/btn:opacity-100 transition-opacity"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </motion.div>
                      </motion.a>
                    )}
                    {project.paperUrl && (
                      <motion.a 
                        href={project.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl bg-gradient-to-r from-neon-purple/20 to-techpurple/20 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/30 hover:border-neon-purple/50 transition-all duration-300 backdrop-blur-sm shadow-lg group/btn"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <FileText className="w-3 h-3" />
                        Research Paper
                        <motion.div
                          className="opacity-0 group-hover/btn:opacity-100 transition-opacity"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </motion.div>
                      </motion.a>
                    )}
                  </div>
                  
                  {/* Research progress indicator */}
                  <motion.div 
                    className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-purple to-techpurple rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${60 + index * 15}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 + 0.8 }}
                    />
                  </motion.div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-neon-purple/30 to-techpurple/30 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Sparkles className="w-full h-full text-neon-purple p-1" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [-15, 15],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, repeatType: "reverse" },
            rotate: { duration: 6, repeat: Infinity }
          }}
        >
          <motion.div
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-elecblue/20 backdrop-blur-sm border border-neon-purple/30 flex items-center justify-center shadow-xl"
            whileHover={{ scale: 1.2, rotate: 15 }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(147, 51, 234, 0)",
                "0 0 0 15px rgba(147, 51, 234, 0.1)",
                "0 0 0 0 rgba(147, 51, 234, 0)"
              ]
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity },
              hover: { type: "spring", stiffness: 400 }
            }}
          >
            <Zap className="w-6 h-6 text-neon-purple" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LabShowcase;
