import React, { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, Calendar, Users, TrendingUp, X, Smartphone, Star, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import projects from '../data/projects';

// Import mobile app images
import App1 from '../assets/app1.jpg';
import App2 from '../assets/app2.jpg';
import App3 from '../assets/app3.jpg';
import CodePrepImage1 from '../assets/appdd03 (1).png';
import CodePrepImage2 from '../assets/appdd04 (1).png';
import CodePrepImage3 from '../assets/appddd02 (1).png';

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
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ rootMargin: '200px', once: false });
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
        <div className="relative h-48 overflow-hidden">
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
        )}        {/* Premium Mobile App Showcase Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-16 border-t border-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 relative overflow-hidden"
        >
          {/* Premium background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-20 left-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.25, 0.1]
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />
          </div>          <div className="text-center mb-20 relative z-10">
            <motion.div 
              className="flex items-center justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className="relative mr-6"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Smartphone className="w-16 h-16 text-purple-400" />
                <motion.div
                  className="absolute inset-0 w-16 h-16 border-2 border-purple-400/30 rounded-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -inset-2 w-20 h-20 border border-blue-400/20 rounded-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -inset-4 w-24 h-24 border border-cyan-400/10 rounded-xl"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    rotate: [0, -90, -180, -270, -360]
                  }}
                  transition={{ duration: 12, repeat: Infinity }}
                />
              </motion.div>
              <motion.h3 
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Mobile <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Applications</span>
              </motion.h3>
              
              {/* Premium floating elements around title */}
              <motion.div
                className="absolute -top-4 left-1/4 w-3 h-3 bg-purple-400/60 rounded-full"
                animate={{ 
                  y: [0, -15, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute -bottom-4 right-1/4 w-2 h-2 bg-blue-400/60 rounded-full"
                animate={{ 
                  y: [0, 10, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className="absolute top-1/2 -right-8 w-4 h-4 bg-cyan-400/40 rounded-full"
                animate={{ 
                  scale: [1, 1.4, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
              />
            </motion.div>
            
            <motion.p 
              className="text-2xl text-gray-300 max-w-5xl mx-auto mb-12 leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Award-winning mobile solutions powering millions of users worldwide with cutting-edge technology, 
              exceptional user experiences, and revolutionary features that redefine digital interaction
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-8 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {[
                { label: 'React Native', color: 'purple', icon: '⚛️', glow: 'shadow-purple-500/30' },
                { label: 'Cross-Platform', color: 'blue', icon: '📱', glow: 'shadow-blue-500/30' },
                { label: 'Real-time Features', color: 'green', icon: '⚡', glow: 'shadow-green-500/30' },
                { label: 'AI Integration', color: 'yellow', icon: '🤖', glow: 'shadow-yellow-500/30' },
                { label: 'Premium UX/UI', color: 'pink', icon: '✨', glow: 'shadow-pink-500/30' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8, y: isVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  className={`relative flex items-center bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-600/50 px-6 py-4 rounded-2xl hover:border-${tech.color}-400/50 transition-all duration-500 hover:scale-110 shadow-xl hover:${tech.glow} group cursor-pointer`}
                  whileHover={{ y: -5 }}
                >
                  <span className="mr-3 text-2xl group-hover:scale-125 transition-transform duration-300">{tech.icon}</span>
                  <span className={`text-${tech.color}-300 font-semibold text-lg`}>{tech.label}</span>
                  <motion.div
                    className={`w-3 h-3 bg-${tech.color}-400 rounded-full ml-3 shadow-lg shadow-${tech.color}-400/50`}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r from-${tech.color}-600/10 to-${tech.color}-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Premium badge shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>{/* Project 1: NextGen Mobile Solutions - Premium Showcase */}
          <motion.div 
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-blue-900/20 rounded-3xl p-12 border border-purple-500/30 shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-2xl opacity-30" />
              
              <div className="grid lg:grid-cols-5 gap-12 items-center relative z-10">
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <motion.div 
                    className="flex items-center mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <Trophy className="w-8 h-8 text-yellow-400 mr-4" />
                    <span className="text-yellow-400 font-bold text-xl tracking-wide">AWARD-WINNING PROJECT</span>
                    <motion.div
                      className="ml-4 w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <motion.h4 
                    className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    NextGen Mobile
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      Solutions
                    </span>
                  </motion.h4>
                  
                  <motion.p 
                    className="text-gray-300 text-xl mb-10 leading-relaxed font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    Revolutionary fintech mobile applications featuring AI-powered financial insights, 
                    real-time cryptocurrency tracking, and seamless payment integrations. Built with 
                    cutting-edge security protocols and intuitive user interfaces that have transformed 
                    how millions of users interact with their finances.
                  </motion.p>
                  
                  <motion.div 
                    className="grid grid-cols-2 gap-6 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    {[
                      { label: '1.2M+', sublabel: 'Active Users', color: 'purple', icon: '👥' },
                      { label: '4.9★', sublabel: 'App Store Rating', color: 'blue', icon: '⭐' },
                      { label: '99.9%', sublabel: 'Uptime', color: 'green', icon: '🚀' },
                      { label: '$2.5B', sublabel: 'Transactions', color: 'yellow', icon: '💰' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className={`relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-2xl border border-gray-700/50 hover:border-${stat.color}-500/50 transition-all duration-500 group backdrop-blur-sm`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                        transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`text-4xl font-bold text-${stat.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                            {stat.label}
                          </div>
                          <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                            {stat.icon}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400 font-medium">{stat.sublabel}</div>
                        <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-600/10 to-${stat.color}-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div 
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                  >
                    {['React Native', 'TypeScript', 'AI/ML', 'Blockchain', 'Real-time Data'].map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600/30 to-blue-600/20 text-purple-300 rounded-full text-sm border border-purple-500/40 font-semibold hover:bg-purple-600/50 transition-all duration-300 shadow-lg backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                        transition={{ duration: 0.4, delay: 2.0 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                <div className="lg:col-span-2 order-1 lg:order-2">
                  <div className="relative w-full">
                    {/* Premium glow effects */}
                    <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-60"></div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur-xl"></div>
                    
                    {/* Enhanced mobile app showcase */}
                    <div className="relative">
                      {/* Main featured image - prominently displayed */}
                      <motion.div
                        className="flex justify-center mb-8"
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40, scale: isVisible ? 1 : 0.9 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                      >
                        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-2 border-purple-500/50 hover:border-purple-400/80 transition-all duration-700 hover:scale-105 shadow-2xl hover:shadow-purple-500/40 backdrop-blur-sm"
                             style={{ width: '240px', height: '420px' }}>
                          <div className="w-full h-full overflow-hidden rounded-3xl">
                            <img
                              src={App2}
                              alt="NextGen App Trading Dashboard"
                              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000"
                              style={{ 
                                objectFit: 'cover',
                                objectPosition: 'center'
                              }}
                              onError={(e) => {
                                console.error(`Failed to load featured image: ${App2}`);
                                e.currentTarget.style.backgroundColor = '#1f2937';
                                e.currentTarget.style.display = 'flex';
                                e.currentTarget.style.alignItems = 'center';
                                e.currentTarget.style.justifyContent = 'center';
                                e.currentTarget.innerHTML = '<div style="color: #9ca3af; font-size: 16px; text-align: center; padding: 20px;">✨ Featured App<br/>Loading...</div>';
                              }}
                            />
                          </div>
                          
                          {/* Premium overlay effects */}
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Featured badge with animation */}
                          <motion.div 
                            className="absolute top-6 left-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            🏆 Featured
                          </motion.div>
                          
                          {/* Live indicator */}
                          <div className="absolute top-6 right-6 flex items-center space-x-2">
                            <motion.div
                              className="w-3 h-3 bg-green-400 rounded-full"
                              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-white text-sm font-semibold">LIVE</span>
                          </div>
                          
                          {/* Bottom info panel with premium styling */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex items-center justify-between text-sm mb-3">
                              <div className="flex items-center space-x-2">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                <span className="text-white font-bold text-lg">4.9</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-300">1.2M users</span>
                              </div>
                            </div>
                            <motion.div
                              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg inline-block"
                              whileHover={{ scale: 1.05 }}
                            >
                              🚀 Trading Platform
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Side images with enhanced layout */}
                      <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
                        {[
                          { image: App1, label: 'Dashboard', color: 'purple', bgColor: 'from-purple-900/30 to-purple-800/20', icon: '📊' },
                          { image: App3, label: 'Wallet', color: 'green', bgColor: 'from-green-900/30 to-green-800/20', icon: '💳' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30, scale: isVisible ? 1 : 0.8 }}
                            transition={{ duration: 0.7, delay: 1.2 + index * 0.3 }}
                            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.bgColor} border border-${item.color}-500/40 hover:border-${item.color}-400/70 transition-all duration-500 hover:scale-110 hover:rotate-2 shadow-xl hover:shadow-${item.color}-500/30 backdrop-blur-sm`}
                            style={{ height: '320px' }}
                            whileHover={{ y: -10 }}
                          >
                            <div className="w-full h-full overflow-hidden rounded-2xl">
                              <img
                                src={item.image}
                                alt={`NextGen App ${item.label}`}
                                className="w-full h-full object-cover object-center group-hover:scale-125 transition-transform duration-700"
                                style={{ 
                                  objectFit: 'cover',
                                  objectPosition: 'center'
                                }}
                                onError={(e) => {
                                  console.error(`Failed to load image: ${item.image}`);
                                  e.currentTarget.style.backgroundColor = '#1f2937';
                                  e.currentTarget.style.display = 'flex';
                                  e.currentTarget.style.alignItems = 'center';
                                  e.currentTarget.style.justifyContent = 'center';
                                  e.currentTarget.innerHTML = `<div style="color: #9ca3af; font-size: 14px; text-align: center; padding: 15px;">${item.icon}<br/>${item.label}<br/>Loading...</div>`;
                                }}
                              />
                            </div>
                            
                            {/* Gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-${item.color}-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            
                            {/* Floating badge */}
                            <motion.div 
                              className={`absolute top-4 right-4 bg-${item.color}-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300`}
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            >
                              {item.icon} {item.label}
                            </motion.div>
                            
                            {/* Stats overlay */}
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-white font-bold">4.9</span>
                                </div>
                                <motion.div
                                  className="w-3 h-3 bg-green-400 rounded-full"
                                  animate={{ scale: [1, 1.3, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Premium decorative elements */}
                      <motion.div
                        className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-sm opacity-60"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-sm opacity-50"
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                      />
                      
                      {/* Floating particles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-purple-400/40 rounded-full"
                          style={{ 
                            left: `${20 + i * 15}%`, 
                            top: `${10 + i * 12}%` 
                          }}
                          animate={{ 
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{ 
                            duration: 3 + i * 0.5, 
                            repeat: Infinity,
                            delay: i * 0.4
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>          {/* Project 2: CodePrep Learning Platform - Premium Enhanced */}
          <motion.div 
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative bg-gradient-to-br from-blue-900/25 via-cyan-800/15 to-blue-900/25 rounded-3xl p-12 border border-blue-500/30 shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Premium animated background elements */}
              <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl opacity-60 animate-pulse" />
              <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tr from-cyan-600/25 to-blue-600/25 rounded-full blur-2xl opacity-40" />
              
              <div className="grid lg:grid-cols-5 gap-12 items-center relative z-10">
                <div className="lg:col-span-2 order-1 lg:order-1">
                  <div className="relative w-full">
                    {/* Premium glow effects for CodePrep */}
                    <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/25 to-cyan-600/25 rounded-3xl blur-2xl opacity-70"></div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/35 to-cyan-600/35 rounded-2xl blur-xl"></div>
                    
                    {/* Enhanced CodePrep showcase */}
                    <div className="relative">
                      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                        {[
                          { image: CodePrepImage1, title: 'Learning Hub', icon: '🎓', color: 'blue' },
                          { image: CodePrepImage2, title: 'Code Editor', icon: '💻', color: 'cyan' },
                          { image: CodePrepImage3, title: 'Progress', icon: '📊', color: 'emerald' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30, scale: isVisible ? 1 : 0.8 }}
                            transition={{ duration: 0.7, delay: 1.0 + index * 0.2 }}
                            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-${item.color}-900/30 to-${item.color}-800/20 border border-${item.color}-500/40 hover:border-${item.color}-400/70 transition-all duration-500 hover:scale-105 hover:-rotate-1 shadow-xl hover:shadow-${item.color}-500/30 backdrop-blur-sm`}
                            style={{ height: '280px' }}
                            whileHover={{ y: -8 }}
                          >
                            <div className="w-full h-full overflow-hidden rounded-2xl">
                              <img
                                src={item.image}
                                alt={`CodePrep ${item.title}`}
                                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                style={{ 
                                  objectFit: 'cover',
                                  objectPosition: 'center'
                                }}
                                onError={(e) => {
                                  console.error(`Failed to load CodePrep image: ${item.image}`);
                                  e.currentTarget.style.backgroundColor = '#1e293b';
                                  e.currentTarget.style.display = 'flex';
                                  e.currentTarget.style.alignItems = 'center';
                                  e.currentTarget.style.justifyContent = 'center';
                                  e.currentTarget.innerHTML = `<div style="color: #94a3b8; font-size: 14px; text-align: center; padding: 15px;">${item.icon}<br/>${item.title}<br/>Loading...</div>`;
                                }}
                              />
                            </div>
                            
                            {/* Gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-${item.color}-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            
                            {/* Floating badge */}
                            <motion.div 
                              className={`absolute top-4 right-4 bg-${item.color}-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300`}
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                            >
                              {item.icon} {item.title}
                            </motion.div>
                            
                            {/* Live indicator */}
                            <div className="absolute top-4 left-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <motion.div
                                className="w-3 h-3 bg-green-400 rounded-full"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <span className="text-white text-xs font-semibold">LIVE</span>
                            </div>
                            
                            {/* Stats overlay */}
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-white font-bold">4.8</span>
                                </div>
                                <motion.div
                                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-2 py-1 rounded-full text-xs font-bold"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {index === 0 ? '🎯 Learn' : index === 1 ? '⚡ Code' : '📈 Track'}
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Premium decorative elements for CodePrep */}
                      <motion.div
                        className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-sm opacity-50"
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-sm opacity-40"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{ duration: 6, repeat: Infinity, delay: 1.5 }}
                      />
                      
                      {/* Floating particles for CodePrep */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-cyan-400/50 rounded-full"
                          style={{ 
                            left: `${15 + i * 18}%`, 
                            top: `${8 + i * 15}%` 
                          }}
                          animate={{ 
                            y: [0, -25, 0],
                            opacity: [0.3, 0.9, 0.3]
                          }}
                          transition={{ 
                            duration: 3.5 + i * 0.6, 
                            repeat: Infinity,
                            delay: i * 0.5
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 order-2 lg:order-2">
                  <motion.div 
                    className="flex items-center mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <Star className="w-8 h-8 text-cyan-400 mr-4" />
                    <span className="text-cyan-400 font-bold text-xl tracking-wide">INNOVATIVE EDUCATION</span>
                    <motion.div
                      className="ml-4 w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <motion.h4 
                    className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    CodePrep
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                      Learning Platform
                    </span>
                  </motion.h4>
                  
                  <motion.p 
                    className="text-gray-300 text-xl mb-10 leading-relaxed font-light"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    Revolutionary educational platform transforming how developers learn and grow. 
                    Features AI-powered mentorship, real-time collaborative coding environments, 
                    personalized learning paths, and comprehensive skill assessment tools that 
                    have helped over 50,000 students master programming.
                  </motion.p>
                  
                  <motion.div 
                    className="grid grid-cols-2 gap-6 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                  >
                    {[
                      { label: '50K+', sublabel: 'Active Students', color: 'blue', icon: '🎓' },
                      { label: '95%', sublabel: 'Completion Rate', color: 'green', icon: '✅' },
                      { label: '12+', sublabel: 'Languages', color: 'purple', icon: '💻' },
                      { label: '24/7', sublabel: 'AI Mentorship', color: 'yellow', icon: '🤖' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className={`relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-6 rounded-2xl border border-gray-700/50 hover:border-${stat.color}-500/50 transition-all duration-500 group backdrop-blur-sm`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
                        transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`text-4xl font-bold text-${stat.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                            {stat.label}
                          </div>
                          <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                            {stat.icon}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400 font-medium">{stat.sublabel}</div>
                        <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-600/10 to-${stat.color}-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div 
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 2.0 }}
                  >
                    {['React Native', 'WebRTC', 'Monaco Editor', 'Docker', 'AI Integration'].map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600/30 to-cyan-600/20 text-blue-300 rounded-full text-sm border border-blue-500/40 font-semibold hover:bg-blue-600/50 transition-all duration-300 shadow-lg backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                        transition={{ duration: 0.4, delay: 2.2 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Health & Fitness App */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="bg-gradient-to-br from-green-600/10 to-teal-600/10 rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mr-4">
                  <div className="w-6 h-6 bg-green-400 rounded-full"></div>
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white">FitTrack Pro</h5>
                  <p className="text-sm text-green-400">Health & Fitness</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Comprehensive fitness tracking with AI-powered workout recommendations and nutrition planning.
              </p>
              <div className="flex justify-between text-xs text-gray-400 mb-4">
                <span>250K+ downloads</span>
                <span>4.8★ rating</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['React Native', 'HealthKit', 'ML'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-green-600/20 text-green-300 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* E-commerce App */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-xl p-6 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mr-4">
                  <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white">ShopSmart</h5>
                  <p className="text-sm text-orange-400">E-commerce</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Next-generation shopping experience with AR try-on features and personalized recommendations.
              </p>
              <div className="flex justify-between text-xs text-gray-400 mb-4">
                {/* <span>800K+ downloads</span> */}
                <span>4.7★ rating</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['React Native', 'ARKit', 'Stripe'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-orange-600/20 text-orange-300 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Social Media App */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="bg-gradient-to-br from-pink-600/10 to-purple-600/10 rounded-xl p-6 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-600/20 rounded-lg flex items-center justify-center mr-4">
                  <div className="w-6 h-6 bg-pink-400 rounded-full"></div>
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white">ConnectHub</h5>
                  <p className="text-sm text-pink-400">Social Network</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Privacy-focused social platform with end-to-end encryption and decentralized architecture.
              </p>
              <div className="flex justify-between text-xs text-gray-400 mb-4">
                <span>1.5M+ users</span>
                <span>4.6★ rating</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['React Native', 'WebRTC', 'Blockchain'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-pink-600/20 text-pink-300 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Gaming App */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-xl p-6 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mr-4">
                  <div className="w-6 h-6 bg-indigo-400 rounded-full"></div>
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white">GameVerse</h5>
                  <p className="text-sm text-indigo-400">Gaming Platform</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Immersive gaming platform with AR/VR integration and multiplayer tournaments.
              </p>
              <div className="flex justify-between text-xs text-gray-400 mb-4">
                <span>2M+ downloads</span>
                <span>4.9★ rating</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['Unity', 'AR/VR', 'Multiplayer'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-indigo-600/20 text-indigo-300 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Travel App */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="bg-gradient-to-br from-teal-600/10 to-blue-600/10 rounded-xl p-6 border border-teal-500/20 hover:border-teal-400/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-600/20 rounded-lg flex items-center justify-center mr-4">
                  <div className="w-6 h-6 bg-teal-400 rounded-full"></div>
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white">WanderLust</h5>
                  <p className="text-sm text-teal-400">Travel & Tourism</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Smart travel companion with AI-powered itinerary planning and local discovery features.
              </p>
              <div className="flex justify-between text-xs text-gray-400 mb-4">
                <span>600K+ downloads</span>
                <span>4.7★ rating</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['React Native', 'Maps API', 'AI Planning'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-teal-600/20 text-teal-300 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Food Delivery App */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="bg-gradient-to-br from-yellow-600/10 to-orange-600/10 rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center mr-4">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white">QuickBite</h5>
                  <p className="text-sm text-yellow-400">Food Delivery</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Ultra-fast food delivery with real-time tracking and AI-powered restaurant recommendations.
              </p>
              <div className="flex justify-between text-xs text-gray-400 mb-4">
                <span>1.8M+ orders</span>
                <span>4.8★ rating</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {['React Native', 'Real-time Tracking', 'AI'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-yellow-600/20 text-yellow-300 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Mobile App Statistics Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-8 border border-gray-600/20"
          >
            <h4 className="text-2xl font-bold text-white text-center mb-8">
              Mobile Portfolio <span className="text-purple-400">Impact</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">8.2M+</div>
                <div className="text-sm text-gray-400">Total Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">4.8★</div>
                <div className="text-sm text-gray-400">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
                <div className="text-sm text-gray-400">App Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">98%</div>
                <div className="text-sm text-gray-400">User Retention</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
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
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
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
