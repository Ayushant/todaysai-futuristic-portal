import React, { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, Calendar, Users, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import projects from '../data/projects';

interface Project {
  id: string;
  title: string;
  url: string;
  type: string;
  category: string;
  description: string;
  techStack: string[];
  features: string[];
  image: string;
  metrics: {
    users: string;
    transactions: string;
    performance: string;
  };
  date: string;
}

const Portfolio: React.FC = () => {
  const [ref, isVisible, entry] = useIntersectionObserver<HTMLDivElement>({ rootMargin: '200px', once: false });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'FinTech', 'AI', 'E-commerce', 'Real Estate', 'Education'];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-900/50 to-gray-900/80 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
      >
        <div className="relative h-56 overflow-hidden rounded-t-xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-semibold bg-purple-600 text-white rounded-full">
              {project.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">{project.date}</span>
            </div>
          </div>

          <p className="text-sm text-purple-300 mb-2">{project.type}</p>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded border border-gray-700"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded border border-gray-700">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <Users className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Users</p>
              <p className="text-sm font-semibold text-white">{project.metrics.users}</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Volume</p>
              <p className="text-sm font-semibold text-white">{project.metrics.transactions}</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Performance</p>
              <p className="text-sm font-semibold text-white">{project.metrics.performance}</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <motion.button
              onClick={() => setSelectedProject(project)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              View Details
            </motion.button>
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-900 min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-purple-400">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our diverse portfolio of cutting-edge web applications and digital solutions
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    (selectedCategory === '' && category === 'All') || selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-xl border border-purple-500/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <div className="w-full aspect-video bg-gray-800 rounded-t-xl overflow-hidden">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent rounded-t-xl" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-gray-900/80 hover:bg-gray-800 text-white p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                    <p className="text-purple-400 font-medium">{selectedProject.type}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-semibold">
                      {selectedProject.category}
                    </span>
                    <div className="flex items-center text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{selectedProject.date}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-8">{selectedProject.description}</p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800 text-gray-300 rounded border border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <h4 className="text-xl font-semibold text-white mb-4">Project Metrics</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Users className="w-5 h-5 text-purple-400 mr-2" />
                          <span className="text-gray-400">Active Users</span>
                        </div>
                        <p className="text-xl font-bold text-white">{selectedProject.metrics.users}</p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                          <span className="text-gray-400">Transaction Volume</span>
                        </div>
                        <p className="text-xl font-bold text-white">{selectedProject.metrics.transactions}</p>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                          <span className="text-gray-400">Performance</span>
                        </div>
                        <p className="text-xl font-bold text-white">{selectedProject.metrics.performance}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <motion.a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Visit Project
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
