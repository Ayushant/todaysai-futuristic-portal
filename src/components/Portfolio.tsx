import React, { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, Calendar, Users, TrendingUp, X, Smartphone, Star, Trophy, Palette, Code, Zap, Award, Eye, Globe, ArrowRight, Play, Sparkles } from 'lucide-react';
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
        <div className="relative h-56 overflow-hidden rounded-t-xl"> {/* Changed from h-48 and added rounded-t-xl */}
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
        </div>        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}        {/* Enhanced Mobile App Showcase Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-16 border-t border-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 relative"
        >
          {/* Premium background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />
          </div>

          <div className="text-center mb-16 relative z-10">
            <motion.div 
              className="flex items-center justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                className="relative mr-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Smartphone className="w-12 h-12 text-purple-400" />
                <motion.div
                  className="absolute inset-0 w-12 h-12 border-2 border-purple-400/30 rounded-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <motion.h3 
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Mobile <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Applications</span>
              </motion.h3>
            </motion.div>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Award-winning mobile solutions powering millions of users across diverse industries with cutting-edge technology and exceptional user experiences that redefine digital interaction
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-6 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {[
                { label: 'React Native', color: 'purple', icon: '⚛️' },
                { label: 'Cross-Platform', color: 'blue', icon: '📱' },
                { label: 'Real-time Features', color: 'green', icon: '⚡' },
                { label: 'AI Integration', color: 'yellow', icon: '🤖' },
                { label: 'Premium UX/UI', color: 'pink', icon: '✨' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  className={`flex items-center bg-gradient-to-r from-${tech.color}-600/20 to-${tech.color}-500/10 backdrop-blur-sm border border-${tech.color}-500/30 px-4 py-3 rounded-full hover:border-${tech.color}-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-${tech.color}-500/20`}
                >
                  <span className="mr-2 text-lg">{tech.icon}</span>
                  <span className={`text-${tech.color}-300 font-medium`}>{tech.label}</span>
                  <motion.div
                    className={`w-2 h-2 bg-${tech.color}-400 rounded-full ml-2`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>{/* Project 1: NextGen Mobile Solutions */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-10 border border-purple-500/30 shadow-2xl backdrop-blur-sm">
              <div className="grid lg:grid-cols-5 gap-10 items-center">
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <div className="flex items-center mb-6">
                    <Trophy className="w-6 h-6 text-yellow-400 mr-3" />
                    <span className="text-yellow-400 font-semibold text-lg">Award-Winning Project</span>
                  </div>
                  <h4 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                    NextGen Mobile
                    <br />
                    <span className="text-purple-400">Solutions</span>
                  </h4>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Revolutionary fintech mobile applications featuring AI-powered financial insights, 
                    real-time cryptocurrency tracking, and seamless payment integrations. Built with 
                    cutting-edge security protocols and intuitive user interfaces that have transformed 
                    how users interact with their finances.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                      <div className="text-3xl font-bold text-purple-400 mb-2">1.2M+</div>
                      <div className="text-sm text-gray-400">Active Users</div>
                    </div>
                    <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                      <div className="text-3xl font-bold text-blue-400 mb-2">4.9★</div>
                      <div className="text-sm text-gray-400">App Store Rating</div>
                    </div>
                    <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                      <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                      <div className="text-sm text-gray-400">Uptime</div>
                    </div>
                    <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">$2.5B</div>
                      <div className="text-sm text-gray-400">Transactions</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {['React Native', 'TypeScript', 'AI/ML', 'Blockchain', 'Real-time Data'].map((tech, index) => (
                      <span
                        key={tech}
                        className="px-6 py-3 bg-purple-600/30 text-purple-300 rounded-full text-sm border border-purple-500/40 font-medium hover:bg-purple-600/50 transition-all duration-300 shadow-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>                <div className="lg:col-span-2 order-1 lg:order-2">
                  <div className="relative w-full">
                    {/* Premium glow effect */}
                    <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-60"></div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur-xl"></div>
                    
                    {/* Enhanced mobile app showcase grid */}
                    <div className="relative">
                      {/* Main featured image - larger and centered */}
                      <div className="flex justify-center mb-6">
                        <motion.div
                          initial={{ opacity: 0, y: 40, scale: 0.9 }}
                          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40, scale: isVisible ? 1 : 0.9 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/40 hover:border-purple-400/70 transition-all duration-700 hover:scale-105 shadow-2xl hover:shadow-purple-500/30 backdrop-blur-sm"
                          style={{ width: '200px', height: '360px' }}
                        >
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
                                e.currentTarget.innerHTML = '<div style="color: #9ca3af; font-size: 14px; text-align: center; padding: 20px;">Featured App<br/>Loading...</div>';
                              }}
                            />
                          </div>
                          {/* Premium overlay with gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          {/* Featured badge */}
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20">
                            Featured
                          </div>
                          {/* Bottom info panel */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-white font-bold">4.9</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-300">1.2M users</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                Trading Platform
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Side images - improved grid layout */}
                      <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                        {[
                          { image: App1, label: 'Dashboard', color: 'purple', bgColor: 'from-purple-900/30 to-purple-800/20' },
                          { image: App3, label: 'Wallet', color: 'green', bgColor: 'from-green-900/30 to-green-800/20' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30, scale: isVisible ? 1 : 0.8 }}
                            transition={{ duration: 0.7, delay: 1.0 + index * 0.3 }}
                            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.bgColor} border border-${item.color}-500/40 hover:border-${item.color}-400/70 transition-all duration-500 hover:scale-105 hover:rotate-1 shadow-xl hover:shadow-${item.color}-500/30 backdrop-blur-sm`}
                            style={{ height: '280px' }}
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
                                  e.currentTarget.innerHTML = '<div style="color: #9ca3af; font-size: 12px; text-align: center; padding: 10px;">Loading...<br/>' + item.label + '</div>';
                                }}
                              />
                            </div>
                            {/* Gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-${item.color}-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            {/* Floating badge */}
                            <div className={`absolute top-3 right-3 bg-${item.color}-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                              {item.label}
                            </div>
                            {/* Stats overlay */}
                            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span className="text-white font-bold">4.9</span>
                                </div>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Premium decorative elements */}
                      <motion.div
                        className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-sm"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-sm"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>          {/* Project 2: CodePrep Learning Platform - Premium Enhanced */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-blue-600/25 to-cyan-600/25 rounded-3xl p-12 border border-blue-500/40 shadow-2xl backdrop-blur-md relative overflow-hidden">
              {/* Enhanced background effects */}
              <div className="absolute -inset-12 bg-gradient-to-r from-blue-600/15 to-cyan-600/15 rounded-3xl blur-3xl opacity-70"></div>
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/25 to-cyan-600/25 rounded-2xl blur-xl"></div>
              
              {/* Award banner */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-600/90 to-orange-600/90 backdrop-blur-sm border border-yellow-500/50 rounded-full px-6 py-2 flex items-center space-x-2 shadow-lg z-10"
              >
                <Star className="w-4 h-4 text-yellow-300 fill-current" />
                <span className="text-white font-bold text-sm">Award-Winning Education Platform</span>
                <Star className="w-4 h-4 text-yellow-300 fill-current" />
              </motion.div>

              <div className="grid lg:grid-cols-5 gap-12 items-center relative z-10">                
                <div className="lg:col-span-2 order-1">
                  <div className="relative w-full">
                    {/* Enhanced CodePrep showcase with premium styling */}
                    <div className="relative">
                      {/* Main featured image - enhanced premium layout */}
                      <div className="flex justify-center mb-8">
                        <motion.div
                          initial={{ opacity: 0, y: 50, scale: 0.85 }}
                          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50, scale: isVisible ? 1 : 0.85 }}
                          transition={{ duration: 1, delay: 0.8 }}
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-2 border-blue-500/50 hover:border-blue-400/80 transition-all duration-700 shadow-2xl hover:shadow-blue-500/40 backdrop-blur-lg"
                          style={{ width: '360px', height: '280px' }}
                        >
                          {/* Enhanced border glow */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-sm"></div>
                          
                          <div className="relative w-full h-full overflow-hidden rounded-3xl bg-gray-900/50">
                            <img
                              src={CodePrepImage2}
                              alt="CodePrep Code Editor Interface"
                              className="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-1000 filter brightness-110 contrast-110"
                              style={{ 
                                objectFit: 'contain',
                                objectPosition: 'center',
                                imageRendering: 'crisp-edges'
                              }}
                              loading="eager"
                              onLoad={(e) => {
                                e.currentTarget.style.filter = 'brightness(110%) contrast(110%) saturate(110%)';
                              }}
                              onError={(e) => {
                                console.error(`Failed to load featured image: ${CodePrepImage2}`);
                                e.currentTarget.style.backgroundColor = '#1f2937';
                                e.currentTarget.style.display = 'flex';
                                e.currentTarget.style.alignItems = 'center';
                                e.currentTarget.style.justifyContent = 'center';
                                e.currentTarget.innerHTML = '<div style="color: #9ca3af; font-size: 14px; text-align: center; padding: 20px;">Code Editor<br/>Loading...</div>';
                              }}
                            />
                          </div>
                          
                          {/* Premium overlay effects */}
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Live indicator with animation */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-white/30 flex items-center space-x-2"
                          >
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span>Live Platform</span>
                          </motion.div>
                          
                          {/* Enhanced bottom info panel */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex items-center justify-between text-sm mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                  <span className="text-white font-bold">Live</span>
                                </div>
                                <span className="text-gray-300">•</span>
                                <span className="text-cyan-300 font-semibold">50K+ students</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-current" />
                                  ))}
                                </div>
                                <span className="text-white text-xs font-bold">4.9</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                Code Editor
                              </span>
                              <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                Real-time
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Side images - enhanced premium grid layout */}
                      <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
                        {[
                          { image: CodePrepImage1, label: 'Learning Hub', color: 'blue', bgColor: 'from-blue-900/40 to-blue-800/30', accent: 'cyan' },
                          { image: CodePrepImage3, label: 'Progress Analytics', color: 'green', bgColor: 'from-green-900/40 to-green-800/30', accent: 'emerald' }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40, scale: 0.8 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40, scale: isVisible ? 1 : 0.8 }}
                            transition={{ duration: 0.8, delay: 1.4 + index * 0.3 }}
                            whileHover={{ scale: 1.08, y: -5, rotateY: 3 }}
                            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.bgColor} border-2 border-${item.color}-500/50 hover:border-${item.accent}-400/80 transition-all duration-500 shadow-xl hover:shadow-${item.color}-500/40 backdrop-blur-lg`}
                            style={{ height: '220px' }}
                          >
                            {/* Enhanced border glow */}
                            <div className={`absolute -inset-1 bg-gradient-to-r from-${item.color}-500 via-${item.accent}-500 to-${item.color}-500 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-sm`}></div>
                            
                            <div className="relative w-full h-full overflow-hidden rounded-3xl bg-gray-900/30">
                              <img
                                src={item.image}
                                alt={`CodePrep Platform ${item.label}`}
                                className="w-full h-full object-contain object-center group-hover:scale-115 transition-transform duration-700 filter brightness-110 contrast-110"
                                style={{ 
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                  imageRendering: 'crisp-edges'
                                }}
                                loading="eager"
                                onLoad={(e) => {
                                  e.currentTarget.style.filter = 'brightness(110%) contrast(110%) saturate(110%)';
                                }}
                                onError={(e) => {
                                  console.error(`Failed to load image: ${item.image}`);
                                  e.currentTarget.style.backgroundColor = '#1f2937';
                                  e.currentTarget.style.display = 'flex';
                                  e.currentTarget.style.alignItems = 'center';
                                  e.currentTarget.style.justifyContent = 'center';
                                  e.currentTarget.innerHTML = '<div style="color: #9ca3af; font-size: 12px; text-align: center; padding: 10px;">Loading...<br/>' + item.label + '</div>';
                                }}
                              />
                            </div>
                            
                            {/* Enhanced gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-${item.color}-900/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />
                            
                            {/* Premium floating badge */}
                            <motion.div
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ duration: 0.5, delay: 1.8 + index * 0.2 }}
                              className={`absolute top-4 right-4 bg-gradient-to-r from-${item.color}-600 to-${item.accent}-600 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20`}
                            >                            >
                              {item.label}
                            </motion.div>
                            
                            {/* Enhanced stats overlay */}
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex items-center justify-between text-xs bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                                <div className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                  <span className="text-white font-bold">Active</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className={`text-${item.accent}-300 font-bold`}>95%</span>
                                  <span className="text-gray-300">completion</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Enhanced premium decorative elements */}
                      <motion.div
                        className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-md"
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.2, 0.6, 0.2],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-md"
                        animate={{ 
                          scale: [1, 1.6, 1],
                          opacity: [0.1, 0.5, 0.1],
                          rotate: [360, 180, 0]
                        }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
                      />
                      
                      {/* Floating particles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-cyan-400/60 rounded-full blur-sm"
                          style={{
                            top: `${20 + i * 30}%`,
                            right: `${10 + i * 15}%`
                          }}
                          animate={{
                            y: [-10, 10, -10],
                            x: [-5, 5, -5],
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 order-2">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex items-center mb-6"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3 animate-pulse shadow-lg"></div>
                    <span className="text-blue-400 font-semibold text-lg">Education Platform</span>
                  </motion.div>
                  
                  <motion.h4
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                  >
                    CodePrep Learning
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Platform</span>
                  </motion.h4>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-gray-300 text-lg mb-8 leading-relaxed"
                  >
                    Revolutionary coding education platform featuring interactive lessons, real-time code execution, 
                    and AI-powered learning assistance. Our comprehensive platform includes collaborative coding environments, 
                    personalized learning paths, and advanced progress tracking that adapts to each 
                    student's unique learning style and pace for optimal skill development.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="grid grid-cols-2 gap-6 mb-8"
                  >
                    {[
                      { value: '50K+', label: 'Active Students', color: 'blue', icon: '👨‍💻' },
                      { value: '95%', label: 'Success Rate', color: 'green', icon: '📈' },
                      { value: '12+', label: 'Languages', color: 'purple', icon: '💻' },
                      { value: '24/7', label: 'AI Support', color: 'yellow', icon: '🤖' }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                        transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl border border-${stat.color}-500/30 hover:border-${stat.color}-400/60 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden`}
                      >
                        {/* Stat card glow effect */}
                        <div className={`absolute inset-0 bg-${stat.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-2">
                            <div className={`text-3xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                            <span className="text-2xl">{stat.icon}</span>
                          </div>
                          <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="flex flex-wrap gap-3"
                  >
                    {['React Native', 'WebRTC', 'Monaco Editor', 'Docker', 'AI Integration', 'Real-time Collaboration'].map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                        transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-300 rounded-full text-sm border border-blue-500/50 font-medium hover:border-blue-400/70 hover:bg-gradient-to-r hover:from-blue-600/50 hover:to-cyan-600/50 transition-all duration-300 shadow-lg backdrop-blur-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>{/* Additional Projects Grid */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h4 className="text-3xl font-bold text-white mb-4">
                More <span className="text-purple-400">Mobile Innovations</span>
              </h4>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore our diverse portfolio of mobile applications across various industries
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Health & Fitness App */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="group bg-gradient-to-br from-green-600/15 to-teal-600/15 rounded-2xl p-8 border border-green-500/30 hover:border-green-400/60 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl backdrop-blur-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600/30 to-teal-600/30 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 bg-green-400 rounded-full shadow-lg"></div>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white">FitTrack Pro</h5>
                    <p className="text-green-400 font-medium">Health & Fitness</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Comprehensive fitness tracking with AI-powered workout recommendations, nutrition planning, 
                  and real-time health monitoring.
                </p>
                <div className="flex justify-between text-sm text-gray-400 mb-6">
                  <span className="font-semibold">250K+ downloads</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React Native', 'HealthKit', 'ML'].map((tech) => (
                    <span key={tech} className="px-3 py-2 bg-green-600/25 text-green-300 rounded-lg text-xs font-medium border border-green-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* E-commerce App */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="group bg-gradient-to-br from-orange-600/15 to-red-600/15 rounded-2xl p-8 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl backdrop-blur-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 bg-orange-400 rounded-full shadow-lg"></div>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white">ShopSmart</h5>
                    <p className="text-orange-400 font-medium">E-commerce</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Next-generation shopping experience with AR try-on features, personalized recommendations, 
                  and seamless checkout.
                </p>
                <div className="flex justify-between text-sm text-gray-400 mb-6">
                  <span className="font-semibold">800K+ downloads</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">4.7</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React Native', 'ARKit', 'Stripe'].map((tech) => (
                    <span key={tech} className="px-3 py-2 bg-orange-600/25 text-orange-300 rounded-lg text-xs font-medium border border-orange-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Social Media App */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="group bg-gradient-to-br from-pink-600/15 to-purple-600/15 rounded-2xl p-8 border border-pink-500/30 hover:border-pink-400/60 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl backdrop-blur-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-600/30 to-purple-600/30 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 bg-pink-400 rounded-full shadow-lg"></div>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white">ConnectHub</h5>
                    <p className="text-pink-400 font-medium">Social Network</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Privacy-focused social platform with end-to-end encryption, decentralized architecture, 
                  and innovative content sharing.
                </p>
                <div className="flex justify-between text-sm text-gray-400 mb-6">
                  <span className="font-semibold">1.5M+ users</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">4.6</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React Native', 'WebRTC', 'Blockchain'].map((tech) => (
                    <span key={tech} className="px-3 py-2 bg-pink-600/25 text-pink-300 rounded-lg text-xs font-medium border border-pink-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Gaming App */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="group bg-gradient-to-br from-indigo-600/15 to-purple-600/15 rounded-2xl p-8 border border-indigo-500/30 hover:border-indigo-400/60 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl backdrop-blur-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 bg-indigo-400 rounded-full shadow-lg"></div>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white">GameVerse</h5>
                    <p className="text-indigo-400 font-medium">Gaming Platform</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Immersive gaming platform with AR/VR integration, multiplayer tournaments, 
                  and cross-platform compatibility.
                </p>
                <div className="flex justify-between text-sm text-gray-400 mb-6">
                  <span className="font-semibold">2M+ downloads</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">4.9</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Unity', 'AR/VR', 'Multiplayer'].map((tech) => (
                    <span key={tech} className="px-3 py-2 bg-indigo-600/25 text-indigo-300 rounded-lg text-xs font-medium border border-indigo-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Travel App */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="group bg-gradient-to-br from-teal-600/15 to-blue-600/15 rounded-2xl p-8 border border-teal-500/30 hover:border-teal-400/60 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl backdrop-blur-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-600/30 to-blue-600/30 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 bg-teal-400 rounded-full shadow-lg"></div>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white">WanderLust</h5>
                    <p className="text-teal-400 font-medium">Travel & Tourism</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Smart travel companion with AI-powered itinerary planning, local discovery features, 
                  and real-time travel updates.
                </p>
                <div className="flex justify-between text-sm text-gray-400 mb-6">
                  <span className="font-semibold">600K+ downloads</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">4.7</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React Native', 'Maps API', 'AI Planning'].map((tech) => (
                    <span key={tech} className="px-3 py-2 bg-teal-600/25 text-teal-300 rounded-lg text-xs font-medium border border-teal-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Food Delivery App */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 1.9 }}
                className="group bg-gradient-to-br from-yellow-600/15 to-orange-600/15 rounded-2xl p-8 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl backdrop-blur-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-600/30 to-orange-600/30 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full shadow-lg"></div>
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-white">QuickBite</h5>
                    <p className="text-yellow-400 font-medium">Food Delivery</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Ultra-fast food delivery with real-time tracking, AI-powered restaurant recommendations, 
                  and seamless ordering experience.
                </p>
                <div className="flex justify-between text-sm text-gray-400 mb-6">
                  <span className="font-semibold">1.8M+ orders</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">4.8</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React Native', 'Real-time Tracking', 'AI'].map((tech) => (
                    <span key={tech} className="px-3 py-2 bg-yellow-600/25 text-yellow-300 rounded-lg text-xs font-medium border border-yellow-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>            </div>
          </div>          {/* Mobile App Statistics Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 rounded-3xl p-12 border border-gray-600/30 backdrop-blur-sm shadow-2xl"
          >
            <div className="text-center mb-12">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Mobile Portfolio <span className="text-purple-400">Impact</span>
              </h4>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Delivering exceptional mobile experiences that drive engagement and business growth across industries
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="bg-purple-600/20 rounded-2xl p-6 mb-4 group-hover:bg-purple-600/30 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">8.2M+</div>
                  <div className="text-sm text-gray-400 font-medium">Total Downloads</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-blue-600/20 rounded-2xl p-6 mb-4 group-hover:bg-blue-600/30 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2 flex items-center justify-center">
                    4.8
                    <Star className="w-6 h-6 text-yellow-400 fill-current ml-1" />
                  </div>
                  <div className="text-sm text-gray-400 font-medium">Average Rating</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-green-600/20 rounded-2xl p-6 mb-4 group-hover:bg-green-600/30 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">15+</div>
                  <div className="text-sm text-gray-400 font-medium">App Categories</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-yellow-600/20 rounded-2xl p-6 mb-4 group-hover:bg-yellow-600/30 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">98%</div>
                  <div className="text-sm text-gray-400 font-medium">User Retention</div>
                </div>
              </div>
            </div>
            
            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-700/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">$50M+</div>
                <div className="text-xs text-gray-500">Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400 mb-1">150+</div>
                <div className="text-xs text-gray-500">Countries Reached</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">99.9%</div>
                <div className="text-xs text-gray-500">Uptime SLA</div>
              </div>            </div>
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
                {/* Changed to aspect-video container for consistent premium image presentation */}
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
