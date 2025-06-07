
import React, { useState, useMemo, useCallback } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Search, 
  X, 
  Users, 
  DollarSign, 
  TrendingUp,
  Smartphone,
  Star,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import mobile app images
import App1 from '@/assets/app1.jpg';
import App2 from '@/assets/app2.jpg';
import App3 from '@/assets/app3.jpg';
import CodePrepImage1 from '@/assets/appdd03 (1).png';
import CodePrepImage2 from '@/assets/appdd04 (1).png';
import CodePrepImage3 from '@/assets/appddd02 (1).png';

// Define Project type
type Project = {
  id: string;
  title: string;
  url?: string;
  type: string;
  category: string;
  description: string;
  techStack: string[];
  features: string[];
  image: string;
  metrics?: {
    users?: string;
    transactions?: string;
    performance?: string;
  };
  date?: string;
};

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    type: 'web',
    category: 'web',
    description: 'A modern e-commerce platform with AI-powered recommendations and real-time inventory management.',
    techStack: ['React', 'Node.js', 'MongoDB', 'AI/ML'],
    features: ['Real-time inventory', 'AI recommendations', 'Payment processing'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    metrics: {
      users: '50K+',
      transactions: '$2M+',
      performance: '99.9%'
    }
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    type: 'mobile',
    category: 'mobile',
    description: 'Secure mobile banking application with biometric authentication and real-time transactions.',
    techStack: ['React Native', 'TypeScript', 'Blockchain'],
    features: ['Biometric auth', 'Real-time transactions', 'Investment tracking'],
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    metrics: {
      users: '100K+',
      transactions: '$5M+',
      performance: '99.8%'
    }
  },
  {
    id: '3',
    title: 'AI Analytics Dashboard',
    type: 'web',
    category: 'ai',
    description: 'Comprehensive analytics dashboard powered by machine learning for business intelligence.',
    techStack: ['React', 'Python', 'TensorFlow', 'D3.js'],
    features: ['Predictive analytics', 'Real-time data', 'Custom reports'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    metrics: {
      users: '25K+',
      performance: '99.5%'
    }
  }
];

// Project Card Component
const ProjectCard = React.memo(({ project, onClick }: { project: Project; onClick: (project: Project) => void }) => {
  const handleClick = useCallback(() => {
    onClick(project);
  }, [project, onClick]);
  
  return (
    <m.div 
      className="glass-card h-full group cursor-pointer relative overflow-hidden"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={handleClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="bg-white/5 text-xs">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 3 && (
            <Badge variant="outline" className="bg-white/5 text-xs">+{project.techStack.length - 3}</Badge>
          )}
        </div>
        
        {/* Metrics if available */}
        {project.metrics && (
          <div className="flex gap-3 text-xs text-white/60">
            {project.metrics.users && (
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{project.metrics.users}</span>
              </div>
            )}
            {project.metrics.transactions && (
              <div className="flex items-center gap-1">
                <DollarSign size={14} />
                <span>{project.metrics.transactions}</span>
              </div>
            )}
            {project.metrics.performance && (
              <div className="flex items-center gap-1">
                <TrendingUp size={14} />
                <span>{project.metrics.performance}</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Overlay with link */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-6">
        <Button size="sm" variant="ghost" className="text-white gap-2 hover:bg-white/10">
          <span>View Project</span>
          <ExternalLink size={14} />
        </Button>
      </div>
    </m.div>
  );
});

// Main Portfolio component
function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Handle project selection
  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);
  
  // Handle search input changes
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);
  
  // Handle category filter changes
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);
  
  // Close project details modal
  const closeProjectDetails = useCallback(() => {
    setSelectedProject(null);
  }, []);
  
  // Memoized filtered projects based on search and category
  const filteredProjects = useMemo(() => {
    return sampleProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
                          
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);
  
  // Extract unique categories for filters
  const categories = useMemo(() => {
    const uniqueCategories = ['all', ...new Set(sampleProjects.map(project => project.category))];
    return uniqueCategories;
  }, []);
    
  return (
    <section className="py-16 relative overflow-hidden" id="portfolio">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <div className="absolute top-0 -left-40 w-80 h-80 rounded-full bg-techpurple/20 blur-3xl"></div>
      <div className="absolute bottom-40 -right-40 w-96 h-96 rounded-full bg-elecblue/20 blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <m.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold heading-gradient mb-5">
            Our Portfolio
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore our diverse range of projects showcasing how we've helped businesses 
            across industries leverage cutting-edge technology to achieve their goals.
          </p>
        </m.div>
        
        {/* Search and Filters */}
        <m.div 
          className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-techpurple/50"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50">
              {searchTerm ? (
                <button onClick={() => setSearchTerm('')} className="hover:text-white">
                  <X size={18} />
                </button>
              ) : (
                <Search size={18} />
              )}
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-techpurple text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </m.div>
        
        {/* Project Grid */}
        <m.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <m.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={handleProjectClick} 
                />
              </m.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white/70 text-lg mb-2">No projects found</p>
                <p className="text-white/50">Try adjusting your search or filter criteria.</p>
                <Button 
                  variant="ghost" 
                  className="mt-4 text-techpurple" 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                >
                  Reset Filters
                </Button>
              </m.div>
            </div>
          )}
        </m.div>
          
        {/* Mobile App Showcase Section 1 */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t border-navy-400/20"
        >
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Smartphone className="w-8 h-8 text-techpurple mr-3" />
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Mobile <span className="text-techpurple">Applications</span>
              </h3>
            </div>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Revolutionary mobile apps that transform user experiences
            </p>
          </div>

          {/* NextGen Mobile Solutions */}
          <div className="bg-gradient-to-r from-techpurple/10 to-blue-600/10 rounded-2xl p-6 md:p-8 lg:p-10 border border-techpurple/20 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Images Column */}
              <div className="lg:col-span-3 space-y-6">
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  {[App1, App2].map((image, index) => (
                    <m.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                      viewport={{ once: true }}
                      className="group relative overflow-hidden rounded-xl bg-navy-600/30 border border-navy-400/20 hover:border-techpurple/50 transition-all duration-300 shadow-lg hover:shadow-techpurple/20"
                    >
                      <div className="aspect-[9/16] overflow-hidden">
                        <img
                          src={image}
                          alt={`NextGen Mobile App Screenshot ${index + 1}`}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </m.div>
                  ))}
                </div>
                
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl bg-navy-600/30 border border-navy-400/20 hover:border-techpurple/50 transition-all duration-300 shadow-lg hover:shadow-techpurple/20"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={App3}
                      alt="NextGen Mobile App Dashboard"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </m.div>
              </div>

              {/* Details Column */}
              <m.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-6 lg:space-y-8"
              >
                <div>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
                    NextGen Mobile Solutions
                  </h4>
                  <p className="text-base lg:text-lg text-white/80 mb-6 lg:mb-8 leading-relaxed">
                    Experience the future of mobile technology with our cutting-edge applications featuring
                    AI-powered interfaces, real-time synchronization, and seamless cross-platform compatibility.
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                    <div className="bg-navy-800/50 p-3 lg:p-4 rounded-lg text-center hover:bg-navy-800/70 transition-colors border border-navy-600/30">
                      <div className="text-xl lg:text-2xl font-bold text-techpurple mb-1">500K+</div>
                      <div className="text-xs lg:text-sm text-white/60">Downloads</div>
                    </div>
                    <div className="bg-navy-800/50 p-3 lg:p-4 rounded-lg text-center hover:bg-navy-800/70 transition-colors border border-navy-600/30">
                      <div className="text-xl lg:text-2xl font-bold text-blue-400 mb-1">4.9★</div>
                      <div className="text-xs lg:text-sm text-white/60">Rating</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-lg font-semibold text-white mb-4">Technology Stack</h5>
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {['React Native', 'TypeScript', 'AI Integration', 'Real-time Sync'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 lg:px-4 py-1.5 lg:py-2 bg-techpurple/10 text-techpurple/90 rounded-full text-xs lg:text-sm border border-techpurple/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </m.div>
        
        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <m.div 
              className="fixed inset-0 z-50 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectDetails}
            >
              <m.div 
                className="bg-navy-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                  <button
                    onClick={closeProjectDetails}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                
                <p className="text-white/80 mb-4">{selectedProject.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="bg-white/5">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-white/80 space-y-1">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedProject.metrics && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProject.metrics.users && (
                          <div className="text-center p-3 bg-navy-700 rounded-lg">
                            <div className="text-xl font-bold text-techpurple">{selectedProject.metrics.users}</div>
                            <div className="text-sm text-white/60">Users</div>
                          </div>
                        )}
                        {selectedProject.metrics.transactions && (
                          <div className="text-center p-3 bg-navy-700 rounded-lg">
                            <div className="text-xl font-bold text-green-400">{selectedProject.metrics.transactions}</div>
                            <div className="text-sm text-white/60">Transactions</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Portfolio;
