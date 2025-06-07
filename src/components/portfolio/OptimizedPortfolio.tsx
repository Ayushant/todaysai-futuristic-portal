
import React, { useState, useMemo, useCallback } from 'react';
import PortfolioHeader from './PortfolioHeader';
import PortfolioFilters, { type Category } from './PortfolioFilters';
import ProjectGrid from './ProjectGrid';
import MobileShowcase from './MobileShowcase';
import ProjectModal from './ProjectModal';
import type { Project } from './ProjectCard';

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
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);
  
  // Handle category filter changes
  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);
  
  // Close project details modal
  const closeProjectDetails = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Handle reset filters
  const handleResetFilters = useCallback(() => {
    setSearchTerm('');
    setActiveCategory('all');
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
  const categories: Category[] = useMemo(() => {
    const uniqueCategories = ['all', ...new Set(sampleProjects.map(project => project.category))];
    return uniqueCategories.map(cat => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1)
    }));
  }, []);
    
  return (
    <section className="py-16 relative overflow-hidden" id="portfolio">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <div className="absolute top-0 -left-40 w-80 h-80 rounded-full bg-techpurple/20 blur-3xl"></div>
      <div className="absolute bottom-40 -right-40 w-96 h-96 rounded-full bg-elecblue/20 blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <PortfolioHeader />
        
        <PortfolioFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          categories={categories}
          selectedCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <ProjectGrid
          projects={filteredProjects}
          onProjectClick={handleProjectClick}
          onResetFilters={handleResetFilters}
        />
          
        <MobileShowcase />
        
        <ProjectModal 
          selectedProject={selectedProject}
          onClose={closeProjectDetails}
        />
      </div>
    </section>
  );
}

export default Portfolio;
