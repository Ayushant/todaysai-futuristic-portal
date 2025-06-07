
import React, { useState, useMemo } from 'react';
import { motion as m } from 'framer-motion';
import PortfolioHeader from './portfolio/PortfolioHeader';
import SearchBar from './portfolio/SearchBar';
import CategoryFilter from './portfolio/CategoryFilter';
import ProjectGrid from './portfolio/ProjectGrid';
import ProjectModal from './portfolio/ProjectModal';
import MobileShowcase from './portfolio/MobileShowcase';
import type { Project } from './portfolio/ProjectCard';

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    type: 'Web Application',
    category: 'web',
    description: 'A modern e-commerce platform with advanced analytics and user management.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    features: ['Real-time inventory', 'Payment processing', 'Admin dashboard', 'Mobile responsive'],
    image: '/placeholder.svg',
    metrics: {
      users: '10K+',
      transactions: '$500K+',
      performance: '98% uptime'
    },
    date: '2024'
  },
  {
    id: '2',
    title: 'AI Analytics Dashboard',
    type: 'SaaS Platform',
    category: 'web',
    description: 'Intelligent analytics platform powered by machine learning algorithms.',
    techStack: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
    features: ['Predictive analytics', 'Real-time data processing', 'Custom reports', 'API integration'],
    image: '/placeholder.svg',
    metrics: {
      users: '5K+',
      performance: '99.9% accuracy'
    },
    date: '2024'
  },
  {
    id: '3',
    title: 'Mobile Banking App',
    type: 'Mobile Application',
    category: 'mobile',
    description: 'Secure mobile banking application with biometric authentication.',
    techStack: ['React Native', 'TypeScript', 'AWS', 'Redis'],
    features: ['Biometric login', 'Real-time transactions', 'Budget tracking', 'Push notifications'],
    image: '/placeholder.svg',
    metrics: {
      users: '50K+',
      transactions: '$2M+',
      performance: '4.8★ rating'
    },
    date: '2024'
  }
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Apps' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'saas', label: 'SaaS' }
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    let filtered = sampleProjects;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
  };

  return (
    <section id="portfolio" className="py-20 bg-navy-900">
      <div className="container mx-auto px-6">
        <PortfolioHeader />

        {/* Search and Filters */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </m.div>

        {/* Projects Grid */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          <ProjectGrid 
            projects={filteredProjects}
            onProjectClick={handleProjectClick}
            onResetFilters={handleResetFilters}
          />
        </m.div>

        <MobileShowcase />

        <ProjectModal
          selectedProject={selectedProject}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default Portfolio;
