import React, { useState, useMemo, useCallback, lazy, Suspense, useRef } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Search, 
  X, 
  ArrowRight, 
  Users, 
  DollarSign, 
  TrendingUp,
  Smartphone,
  Star,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
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
  url: string;
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

// Lazy load components to reduce initial bundle size
const OptimizedImage = lazy(() => import('@/components/OptimizedImage'));
const ProjectDetail = lazy(() => import('@/components/ProjectDetail'));

// Lazy load category filters with code splitting
const CategoryFilters = lazy(() => import('@/components/portfolio/CategoryFilters'));

// Use dynamic imports for project data to reduce main bundle size
const useProjectData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  React.useEffect(() => {
    // Dynamic import of project data
    import('@/data/projects').then(module => {
      setProjects(module.default);
      setLoading(false);
    });
  }, []);
  
  return { projects, loading };
};

// Memoized loading placeholder component
const ProjectPlaceholder = React.memo(() => (
  <div className="glass-card h-full animate-pulse">
    <div className="h-48 bg-white/5"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-white/5 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-white/5 rounded"></div>
        <div className="h-4 bg-white/5 rounded w-5/6"></div>
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-6 bg-white/5 rounded w-16"></div>
        <div className="h-6 bg-white/5 rounded w-16"></div>
        <div className="h-6 bg-white/5 rounded w-16"></div>
      </div>
    </div>
  </div>
));

// Memoized ProjectCard component for better performance
const ProjectCard = React.memo(({ project, onClick }: { project: Project; onClick: (project: Project) => void }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ rootMargin: '200px', once: false });
  
  // Memoize event handler to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    onClick(project);
  }, [project, onClick]);
  
  return (
    <div ref={ref} className="h-full">
      {isVisible ? (
        <m.div 
          className="glass-card h-full group cursor-pointer relative overflow-hidden"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={handleClick}
        >
          <div className="h-48 overflow-hidden">
            <Suspense fallback={<div className="w-full h-full bg-white/5 animate-pulse"></div>}>
              <OptimizedImage 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                width={400}
                height={225}
                loading="lazy"
                fetchPriority="low"
              />
            </Suspense>
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
      ) : (
        <ProjectPlaceholder />
      )}
    </div>
  );
});

// Main Portfolio component
function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { projects, loading } = useProjectData();
  
  // Add intersection observer for mobile app sections
  const [ref, isInView] = useIntersectionObserver<HTMLDivElement>({ rootMargin: '200px', once: false });
  
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
    if (loading) return [];
    
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
                          
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, activeCategory, loading]);
  
  // Extract unique categories for filters
  const categories = useMemo(() => {
    if (loading) return ['all'];
    
    const uniqueCategories = ['all', ...new Set(projects.map(project => project.category))];
    return uniqueCategories;
  }, [projects, loading]);
  
  // Load placeholder projects while main data is loading
  const placeholderProjects = useMemo(() => {
    return Array(6).fill(null).map((_, index) => ({ id: `placeholder-${index}` }));
  }, []);
    return (
    <section ref={ref} className="py-16 relative overflow-hidden" id="portfolio">
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
          
          {/* Category Filters - Lazy loaded */}
          <Suspense fallback={<div className="h-10 w-full md:w-auto bg-white/5 animate-pulse rounded-full"></div>}>
            <CategoryFilters 
              categories={categories} 
              activeCategory={activeCategory} 
              onChange={handleCategoryChange} 
            />
          </Suspense>
        </m.div>
        
        {/* Project Grid - Virtualized for large lists */}
        <m.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {loading ? (
            // Display placeholders while loading
            placeholderProjects.map(placeholder => (
              <div key={placeholder.id} className="h-full">
                <ProjectPlaceholder />
              </div>
            ))
          ) : filteredProjects.length > 0 ? (
            // Display filtered projects
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
            // No results message
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
            </div>          )}
        </m.div>
          {/* Mobile App Showcase Section 1 - NextGen Mobile Solutions */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
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
          </div>          {/* NextGen Mobile Solutions - Images Left, Details Right */}
          <div className="bg-gradient-to-r from-techpurple/10 to-blue-600/10 rounded-2xl p-6 md:p-8 lg:p-10 border border-techpurple/20 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Images Column - Left (3/5 width on large screens) */}
              <div className="lg:col-span-3 space-y-6">
                {/* Top row with two mobile screenshots */}
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  {[App1, App2].map((image, index) => (
                    <m.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                      className="group relative overflow-hidden rounded-xl bg-navy-600/30 border border-navy-400/20 hover:border-techpurple/50 transition-all duration-300 shadow-lg hover:shadow-techpurple/20"
                    >
                      <div className="aspect-[9/16] overflow-hidden">
                        <img
                          src={image}
                          alt={`NextGen Mobile App Screenshot ${index + 1}`}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-techpurple/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
                          Mobile App
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-white text-sm font-medium">4.{index + 8}/5</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Trophy className="w-4 h-4 text-techpurple" />
                            <span className="text-white text-sm">{index === 0 ? 'Featured' : 'Popular'}</span>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>
                
                {/* Bottom row with wider screenshot */}
                <m.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="group relative overflow-hidden rounded-xl bg-navy-600/30 border border-navy-400/20 hover:border-techpurple/50 transition-all duration-300 shadow-lg hover:shadow-techpurple/20"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={App3}
                      alt="NextGen Mobile App Dashboard"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-techpurple/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
                      Dashboard
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white text-sm font-medium">4.9/5</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4 text-techpurple" />
                        <span className="text-white text-sm">Premium</span>
                      </div>
                    </div>
                  </div>
                </m.div>
              </div>              {/* Details Column - Right (2/5 width on large screens) */}
              <m.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="lg:col-span-2 space-y-6 lg:space-y-8"
              >
                <div>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
                    NextGen Mobile Solutions
                  </h4>
                  <p className="text-base lg:text-lg text-white/80 mb-6 lg:mb-8 leading-relaxed">
                    Experience the future of mobile technology with our cutting-edge applications featuring
                    AI-powered interfaces, real-time synchronization, and seamless cross-platform compatibility.
                    Our apps deliver exceptional performance with intuitive design that users love.
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
                    <div className="bg-navy-800/50 p-3 lg:p-4 rounded-lg text-center hover:bg-navy-800/70 transition-colors border border-navy-600/30">
                      <div className="text-xl lg:text-2xl font-bold text-green-400 mb-1">99.9%</div>
                      <div className="text-xs lg:text-sm text-white/60">Uptime</div>
                    </div>
                    <div className="bg-navy-800/50 p-3 lg:p-4 rounded-lg text-center hover:bg-navy-800/70 transition-colors border border-navy-600/30">
                      <div className="text-xl lg:text-2xl font-bold text-yellow-400 mb-1">24/7</div>
                      <div className="text-xs lg:text-sm text-white/60">Support</div>
                    </div>
                  </div>
                  
                  {/* Key Features */}
                  <div className="space-y-3 mb-6 lg:mb-8">
                    <h5 className="text-lg font-semibold text-white">Key Features</h5>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { feature: 'AI-Powered Interface', icon: '🤖' },
                        { feature: 'Real-time Synchronization', icon: '⚡' },
                        { feature: 'Cross-platform Compatibility', icon: '📱' },
                        { feature: 'Advanced Security', icon: '🔒' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-techpurple/5 border border-techpurple/20">
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-white/90 text-sm lg:text-base">{item.feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-lg font-semibold text-white mb-4">Technology Stack</h5>
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {['React Native', 'TypeScript', 'AI Integration', 'Real-time Sync', 'Cloud Storage', 'Push Notifications'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 lg:px-4 py-1.5 lg:py-2 bg-techpurple/10 text-techpurple/90 rounded-full text-xs lg:text-sm border border-techpurple/30 hover:border-techpurple/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </m.div>        {/* Mobile App Showcase Section 2 - CodePrep Learning Platform */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              CodePrep <span className="text-techpurple">Learning Platform</span>
            </h3>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Advanced coding education platform with interactive lessons and real-time code execution
            </p>
          </div>          {/* CodePrep Learning Platform - Details Left, Images Right */}
          <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl p-6 md:p-8 lg:p-10 border border-blue-500/20">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Details Column - Left (2/5 width on large screens) */}
              <m.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="lg:col-span-2 space-y-6 lg:space-y-8"
              >
                <div>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
                    Interactive Learning Experience
                  </h4>
                  <p className="text-base lg:text-lg text-white/80 mb-6 lg:mb-8 leading-relaxed">
                    CodePrep revolutionizes coding education with hands-on learning, instant feedback,
                    and personalized learning paths. Students can practice coding in real-time environments
                    with immediate code execution and debugging assistance.
                  </p>
                  
                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                    <div className="flex items-center space-x-3 p-3 lg:p-4 bg-blue-600/10 rounded-lg border border-blue-500/20">
                      <div className="w-3 h-3 bg-blue-400 rounded-full flex-shrink-0"></div>
                      <span className="text-white font-medium text-sm lg:text-base">Live Code Execution</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 lg:p-4 bg-green-600/10 rounded-lg border border-green-500/20">
                      <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                      <span className="text-white font-medium text-sm lg:text-base">Real-time Collaboration</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 lg:p-4 bg-purple-600/10 rounded-lg border border-purple-500/20">
                      <div className="w-3 h-3 bg-techpurple rounded-full flex-shrink-0"></div>
                      <span className="text-white font-medium text-sm lg:text-base">AI-Powered Hints</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 lg:p-4 bg-yellow-600/10 rounded-lg border border-yellow-500/20">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0"></div>
                      <span className="text-white font-medium text-sm lg:text-base">Progress Tracking</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6 lg:mb-8">
                    <div className="bg-navy-800/50 p-3 lg:p-4 rounded-lg text-center hover:bg-navy-800/70 transition-colors border border-navy-600/30">
                      <div className="text-lg lg:text-xl font-bold text-blue-400 mb-1">10K+</div>
                      <div className="text-xs lg:text-sm text-white/60">Active Students</div>
                    </div>
                    <div className="bg-navy-800/50 p-3 lg:p-4 rounded-lg text-center hover:bg-navy-800/70 transition-colors border border-navy-600/30">
                      <div className="text-lg lg:text-xl font-bold text-green-400 mb-1">95%</div>
                      <div className="text-xs lg:text-sm text-white/60">Completion Rate</div>
                    </div>
                    <div className="bg-navy-800/50 p-3 lg:p-4 rounded-lg text-center hover:bg-navy-800/70 transition-colors border border-navy-600/30">
                      <div className="text-lg lg:text-xl font-bold text-techpurple mb-1">50+</div>
                      <div className="text-xs lg:text-sm text-white/60">Languages</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-lg font-semibold text-white mb-4">Technology Stack</h5>
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {['React', 'Node.js', 'WebRTC', 'Docker', 'Monaco Editor', 'Socket.io'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 lg:px-4 py-1.5 lg:py-2 bg-blue-600/10 text-blue-300 rounded-full text-xs lg:text-sm border border-blue-500/30 hover:border-blue-400/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </m.div>

              {/* Images Column - Right (3/5 width on large screens) */}
              <div className="lg:col-span-3 space-y-6">
                {/* Top row with two screenshots */}
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  {[CodePrepImage1, CodePrepImage2].map((image, index) => (
                    <m.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                      className="group relative overflow-hidden rounded-xl bg-navy-600/30 border border-navy-400/20 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={image}
                          alt={`CodePrep Platform Screenshot ${index + 1}`}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
                          Learning Platform
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-between">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {index === 0 ? 'Dashboard' : 'Lessons'}
                          </span>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-white text-xs">Live</span>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>
                
                {/* Bottom row with wider code editor screenshot */}
                <m.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="group relative overflow-hidden rounded-xl bg-navy-600/30 border border-navy-400/20 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={CodePrepImage3}
                      alt="CodePrep Platform Code Editor"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-cyan-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
                      Code Editor
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-between">
                      <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Interactive IDE
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white text-xs">Active</span>
                      </div>
                    </div>
                  </div>
                </m.div>
              </div>
            </div>
          </div>
        </m.div>
        
        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <Suspense fallback={
              <m.div 
                className="fixed inset-0 z-50 bg-navy-200/80 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-full max-w-4xl mx-auto h-64 bg-white/5 animate-pulse rounded-xl"></div>
              </m.div>
            }>
              <ProjectDetail 
                project={selectedProject} 
                onClose={closeProjectDetails} 
              />
            </Suspense>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Wrap with ErrorBoundary for graceful error handling
export default function PortfolioWithErrorBoundary() {
  return (
    <ErrorBoundary fallback={
      <div className="py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Something went wrong</h2>
        <p className="text-white/70 mb-6">We're having trouble loading the portfolio section.</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    }>
      <Portfolio />
    </ErrorBoundary>
  );
}
