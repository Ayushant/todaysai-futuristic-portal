import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Globe, ExternalLink, Star, Users, Code, Zap, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Web Applications Data
const webApps = [
  {
    id: 1,
    title: 'FairPlace',
    category: 'Real Estate Platform',
    description: 'Comprehensive property marketplace with advanced search filters and virtual property tours.',
    url: 'https://fairplace.in',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.8,
    users: '50K+',
    status: 'Live',
    features: ['Property Search', 'Virtual Tours', 'Price Analytics', 'Agent Connect'],
    tech: ['React', 'Node.js', 'MongoDB', 'Real Estate API'],
    color: 'emerald'
  },
  {
    id: 2,
    title: 'MakeMyCrop',
    category: 'Agriculture Technology',
    description: 'Smart farming platform with crop management, weather analysis, and market insights.',
    url: 'https://makemycrop.com',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.9,
    users: '75K+',
    status: 'Live',
    features: ['Crop Planning', 'Weather Analytics', 'Market Prices', 'Expert Consultation'],
    tech: ['Vue.js', 'Python', 'AI/ML', 'Weather API'],
    color: 'green'
  },
  {
    id: 3,
    title: 'German Classes',
    category: 'Education Platform',
    description: 'Interactive German language learning platform with personalized lessons and progress tracking.',
    url: 'https://adityasirgermanclasses.netlify.app',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.7,
    users: '12K+',
    status: 'Live',
    features: ['Interactive Lessons', 'Progress Tracking', 'Speaking Practice', 'Certification'],
    tech: ['React', 'Firebase', 'WebRTC', 'Audio Processing'],
    color: 'blue'
  },
  {
    id: 4,
    title: 'WordPressNA',
    category: 'Web Development',
    description: 'Modern WordPress development showcase with custom themes and advanced functionality.',
    url: 'https://wordpressna.netlify.app',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.6,
    users: '8K+',
    status: 'Live',
    features: ['Custom Themes', 'Plugin Development', 'SEO Optimization', 'Performance Tuning'],
    tech: ['WordPress', 'PHP', 'MySQL', 'JavaScript'],
    color: 'indigo'
  },
  {
    id: 5,
    title: 'TodaysAI',
    category: 'Artificial Intelligence',
    description: 'AI-powered solutions hub featuring latest AI tools, news, and innovative applications.',
    url: 'https://todaysai.netlify.app',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.9,
    users: '100K+',
    status: 'Live',
    features: ['AI Tools Directory', 'News Aggregation', 'AI Tutorials', 'Community Features'],
    tech: ['React', 'TypeScript', 'AI APIs', 'Netlify'],
    color: 'purple'
  },
  {
    id: 6,
    title: 'SRINC',
    category: 'Corporate Website',
    description: 'Professional corporate website with modern design and comprehensive business solutions.',
    url: 'https://srinc.in',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.8,
    users: '25K+',
    status: 'Live',
    features: ['Corporate Branding', 'Service Portfolio', 'Client Testimonials', 'Contact Management'],
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'CMS'],
    color: 'cyan'
  },
  {
    id: 7,
    title: 'Karigari Demo',
    category: 'Marketplace Platform',
    description: 'Artisan marketplace connecting skilled craftspeople with customers seeking quality handmade products.',
    url: 'https://karigaridemo.netlify.app',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.7,
    users: '30K+',
    status: 'Demo',
    features: ['Artisan Profiles', 'Product Showcase', 'Order Management', 'Payment Integration'],
    tech: ['React', 'E-commerce API', 'Payment Gateway', 'Cloud Storage'],
    color: 'orange'
  },
  {
    id: 8,
    title: 'SportsGearSwag',
    category: 'E-commerce Platform',
    description: 'Premium sports equipment and merchandise store with advanced filtering and reviews.',
    url: 'https://www.sportsgearswag.com',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.8,
    users: '45K+',
    status: 'Live',
    features: ['Product Catalog', 'Advanced Search', 'User Reviews', 'Inventory Management'],
    tech: ['Shopify', 'JavaScript', 'Payment APIs', 'Analytics'],
    color: 'red'
  },
  {
    id: 9,
    title: 'Wristband Store',
    category: 'Custom Products',
    description: 'Custom wristband design and ordering platform with 3D preview and bulk ordering options.',
    url: 'https://www.wristband.com',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80',
    rating: 4.9,
    users: '80K+',
    status: 'Live',
    features: ['3D Design Tool', 'Bulk Ordering', 'Material Selection', 'Quick Quotes'],
    tech: ['Three.js', 'React', 'WebGL', 'E-commerce'],
    color: 'pink'
  }
];

const WebAppShowcase = () => {
  const [selectedApp, setSelectedApp] = useState<typeof webApps[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'e-commerce', 'education', 'ai', 'marketplace', 'corporate'];
  
  const filteredApps = webApps.filter(app => 
    activeCategory === 'all' || 
    app.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
    (activeCategory === 'e-commerce' && (app.category.includes('E-commerce') || app.category.includes('Custom Products'))) ||
    (activeCategory === 'ai' && app.category.includes('Artificial Intelligence')) ||
    (activeCategory === 'marketplace' && app.category.includes('Marketplace')) ||
    (activeCategory === 'corporate' && app.category.includes('Corporate'))
  );

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: { bg: 'from-emerald-500 to-teal-500', border: 'border-emerald-500/50', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      green: { bg: 'from-green-500 to-lime-500', border: 'border-green-500/50', badge: 'bg-green-500/20 text-green-300 border-green-500/30' },
      blue: { bg: 'from-blue-500 to-cyan-500', border: 'border-blue-500/50', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      indigo: { bg: 'from-indigo-500 to-purple-500', border: 'border-indigo-500/50', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
      purple: { bg: 'from-purple-500 to-pink-500', border: 'border-purple-500/50', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
      cyan: { bg: 'from-cyan-500 to-blue-500', border: 'border-cyan-500/50', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
      orange: { bg: 'from-orange-500 to-red-500', border: 'border-orange-500/50', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
      red: { bg: 'from-red-500 to-pink-500', border: 'border-red-500/50', badge: 'bg-red-500/20 text-red-300 border-red-500/30' },
      pink: { bg: 'from-pink-500 to-rose-500', border: 'border-pink-500/50', badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Premium Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/20 to-purple-900/20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse premium-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Premium Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 px-8 py-4">
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  Web Applications
                </h2>
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our collection of cutting-edge web applications built with modern technologies and exceptional user experiences
          </p>
        </m.div>

        {/* Category Filter */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10 shadow-2xl">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Projects', icon: Star },
                { key: 'e-commerce', label: 'E-commerce', icon: Zap },
                { key: 'education', label: 'Education', icon: Heart },
                { key: 'ai', label: 'AI & Tech', icon: Code },
                { key: 'marketplace', label: 'Marketplace', icon: Users },
                { key: 'corporate', label: 'Corporate', icon: Shield }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 text-sm ${
                    activeCategory === key
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </m.div>

        {/* All Projects Section Title */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Explore All Projects
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Browse through our comprehensive portfolio of web applications spanning various industries and technologies
          </p>
        </m.div>

        {/* Web Apps Grid */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredApps.map((app, index) => {
            const colors = getColorClasses(app.color);
            return (
              <m.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedApp(app)}
              >
                <div className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:${colors.border} web-app-card hover-${app.color}`}>                  {/* Website Preview */}
                  <div className="relative mb-6">
                    <div className="w-full h-48 web-browser-frame p-2 shadow-2xl">
                      <div className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="w-full h-6 bg-gray-800 flex items-center gap-2 px-3">
                          <div className="flex gap-1 ml-8">
                            <div className="flex-1 bg-gray-700 rounded text-xs text-gray-400 px-2 py-0.5">
                              {app.url}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-center flex items-center justify-center h-full">
                          <div className={`w-20 h-20 bg-gradient-to-r ${colors.bg} rounded-2xl flex items-center justify-center shadow-lg`}>
                            <Globe className="w-10 h-10 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Status Badge */}
                    <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${colors.bg} p-3 rounded-2xl shadow-xl ${app.status === 'Live' ? 'status-live' : ''}`}>
                      <div className="flex items-center gap-2 text-white text-sm font-medium">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${app.status === 'Live' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                        {app.status}
                      </div>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute -bottom-2 -left-2 bg-white/10 backdrop-blur-lg p-3 rounded-2xl border border-white/20">
                      <div className="flex items-center gap-2 text-white">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span className="font-bold text-sm">{app.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* App Info */}
                  <div className="space-y-4">
                    <div>
                      <Badge className={colors.badge}>
                        {app.category}
                      </Badge>
                      <h4 className="text-xl font-bold text-white mb-2 mt-2">{app.title}</h4>
                      <p className="text-white/70 text-sm line-clamp-2">{app.description}</p>
                    </div>
                    
                    {/* Key Features */}
                    <div className="grid grid-cols-2 gap-1">
                      {app.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-white/60">
                          <div className={`w-1 h-1 bg-${app.color}-400 rounded-full`}></div>
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Stats & Actions */}
                    <div className="flex items-center justify-between text-sm pt-2">
                      <div className="flex items-center gap-1 text-white/60">
                        <Users className="w-4 h-4" />
                        <span>{app.users}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(app.url, '_blank');
                          }}
                          className={`bg-gradient-to-r ${colors.bg} hover:opacity-90 text-white text-xs`}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Visit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            );
          })}        </m.div>

        {/* Web App Detail Modal */}
        <AnimatePresence>
          {selectedApp && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setSelectedApp(null)}
            >
              <m.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 premium-modal"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const colors = getColorClasses(selectedApp.color);
                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <Badge className={colors.badge}>
                            {selectedApp.category}
                          </Badge>
                          <h3 className="text-3xl font-bold text-white mb-4 mt-2">{selectedApp.title}</h3>
                          <p className="text-white/80 leading-relaxed">{selectedApp.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <div className={`text-2xl font-bold mb-1 bg-gradient-to-r ${colors.bg} bg-clip-text text-transparent`}>
                              {selectedApp.rating}
                            </div>
                            <div className="text-white/60 text-sm">Rating</div>
                          </div>
                          <div className="bg-white/5 rounded-2xl p-4 text-center">
                            <div className={`text-2xl font-bold mb-1 bg-gradient-to-r ${colors.bg} bg-clip-text text-transparent`}>
                              {selectedApp.users}
                            </div>
                            <div className="text-white/60 text-sm">Users</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Features</h4>
                          <div className="space-y-2">
                            {selectedApp.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-3 text-white/80">
                                <div className={`w-2 h-2 rounded-full bg-${selectedApp.color}-400`}></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Technology Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedApp.tech.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 bg-white/10 text-white/80 rounded-lg text-sm border border-white/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="sticky top-4">
                          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <div className={`w-24 h-24 bg-gradient-to-r ${colors.bg} rounded-3xl flex items-center justify-center shadow-2xl`}>
                                <Globe className="w-12 h-12 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="flex justify-end gap-3 mt-8">
                  <Button
                    onClick={() => setSelectedApp(null)}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={() => window.open(selectedApp.url, '_blank')}
                    className={`text-white bg-gradient-to-r ${getColorClasses(selectedApp.color).bg} hover:opacity-90`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WebAppShowcase;
