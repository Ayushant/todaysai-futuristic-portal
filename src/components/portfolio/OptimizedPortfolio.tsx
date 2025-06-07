
import React, { useState, useMemo, useCallback } from 'react';
import { motion as m } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectCard, { type Project } from './ProjectCard';
import MobileShowcase from './MobileShowcase';
import ProjectModal from './ProjectModal';

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
          
        {/* Mobile App Showcase Section */}
        <MobileShowcase />
        
        {/* Project Details Modal */}
        <ProjectModal 
          selectedProject={selectedProject}
          onClose={closeProjectDetails}
        />
      </div>
    </section>
  );
}

export default Portfolio;
