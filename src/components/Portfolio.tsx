
import React, { useState, useMemo } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProjectCard from './portfolio/ProjectCard';
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

  return (
    <section id="portfolio" className="py-20 bg-navy-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-techpurple">Portfolio</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover our innovative solutions that drive business growth and user engagement
          </p>
        </m.div>

        {/* Search and Filters */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-navy-800/50 border-navy-600 text-white placeholder:text-white/50"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    ${selectedCategory === category.id 
                      ? 'bg-techpurple hover:bg-techpurple/80 text-white' 
                      : 'bg-transparent border-navy-600 text-white/70 hover:bg-navy-800/50 hover:text-white'
                    }
                  `}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              ))}
            </div>
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
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <m.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <ProjectCard
                  project={project}
                  onClick={handleProjectClick}
                />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>

        {/* Mobile Showcase */}
        <MobileShowcase />

        {/* Project Modal */}
        <ProjectModal
          selectedProject={selectedProject}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default Portfolio;
