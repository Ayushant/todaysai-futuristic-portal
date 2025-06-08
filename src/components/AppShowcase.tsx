import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Smartphone, Star, Download, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import app images
import app1 from '../assets/app1.jpg';
import app2 from '../assets/app2.jpg';
import app3 from '../assets/app3.jpg';
import appdd03 from '../assets/appdd03 (1).png';
import appdd04 from '../assets/appdd04 (1).png';
import appddd02 from '../assets/appddd02 (1).png';

// Mobile Apps - Both are mobile applications
const mobileApps = [
  {
    id: 1,
    title: 'Winwitty',
    category: 'Gaming app',
    description: 'Advanced gaming platform with AI-powered insights, and comprehensive portfolio tracking.',
    image: app1,
    preview: app1,
    screenshots: [app1, app2, app3],
    rating: 4.9,
    downloads: '5K+',
    users: '2.5K+',
    platform: 'Mobile',
    features: ['AI-Powered Analytics', 'Real-time Trading', 'Portfolio Management', 'Risk Assessment', 'Smart Notifications', 'Multi-Currency Support'],
    tech: ['React Native', 'TypeScript', 'WebSocket', 'Chart.js']
  },
  {
    id: 2,
    title: 'Codex',
    category: 'Education',
    description: 'Comprehensive mobile study platform with advanced visualization & quick notes.',
    image: appdd03,
    preview: appdd03,
    screenshots: [appdd03, appdd04, appddd02],
    rating: 4.8,
    downloads: '30K+',
    users: '15K+',
    platform: 'Mobile',
    features: ['Real-time Analytics', 'Mobile Dashboards', 'Data Visualization', 'Team Collaboration', 'API Integration', 'Offline Reports'],
    tech: ['React Native', 'TypeScript', 'Node.js', 'SQLite', 'Redux']
  }
];

// All apps are mobile apps
const appSamples = mobileApps;

const AppShowcase = () => {
  const [selectedApp, setSelectedApp] = useState<typeof appSamples[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'mobile'>('all');
  const filteredApps = appSamples.filter(app => 
    activeCategory === 'all' || 
    (activeCategory === 'mobile' && app.platform === 'Mobile')
  );

  return (
    <section className="py-20 relative overflow-hidden">      {/* Premium Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse premium-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 px-8 py-4">
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Premium Apps
                </h2>
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience our collection of cutting-edge applications with stunning UI designs and powerful functionality
          </p>
        </m.div>

        {/* Category Filter */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10 shadow-2xl">
            {[
              { key: 'all', label: 'All Apps', icon: Star },
              { key: 'mobile', label: 'Mobile', icon: Smartphone }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key as any)}
                className={`px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </m.div>        {/* Premium App Sections */}
        {(activeCategory === 'all' || activeCategory === 'mobile') && (
          <m.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            {/* Mobile Apps Section */}
            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">Mobile Applications</h3>
                  <p className="text-gray-300">Cutting-edge mobile experiences</p>
                </div>
              </div>              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {mobileApps.map((app, index) => (
                  <m.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedApp(app)}
                  >
                    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-purple-500/50 app-card-hover hover:shadow-2xl hover:shadow-purple-500/20">
                      {/* App Screenshots Grid */}
                      <div className="relative mb-8">
                        <div className="flex justify-center gap-3 mb-6">
                          {app.screenshots.map((screenshot, idx) => (
                            <div key={idx} className="w-28 h-48 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                              <div className="w-full h-full rounded-2xl overflow-hidden bg-white">
                                <img
                                  src={screenshot}
                                  alt={`${app.title} Screenshot ${idx + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-700 rounded-full"></div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Floating Rating */}
                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-2xl shadow-xl">
                          <div className="flex items-center gap-2 text-white">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-bold text-lg">{app.rating}</span>
                          </div>
                        </div>
                        
                        {/* Downloads Badge */}
                        <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-lg p-3 rounded-2xl border border-white/20">
                          <div className="flex items-center gap-2 text-white">
                            <Download className="w-4 h-4" />
                            <span className="font-bold text-sm">{app.downloads}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* App Info */}
                      <div className="space-y-6">
                        <div className="text-center">
                          <Badge className={`mb-3 ${
                            index === 0 ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                                       : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          }`}>
                            {app.category}
                          </Badge>
                          <h4 className="text-2xl font-bold text-white mb-3">{app.title}</h4>
                          <p className="text-white/70 text-base leading-relaxed">{app.description}</p>
                        </div>
                        
                        {/* Key Features */}
                        <div className="grid grid-cols-2 gap-2">
                          {app.features.slice(0, 6).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-white/70 bg-white/5 rounded-lg p-2">
                              <div className={`w-2 h-2 rounded-full ${
                                index === 0 ? 'bg-purple-400' : 'bg-blue-400'
                              }`}></div>
                              <span className="text-xs font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Stats & CTA */}
                        <div className="flex items-center justify-between pt-4">
                          <div className="flex flex-col gap-2 text-white/60">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span className="text-sm font-semibold">{app.users}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              <span className="text-sm font-semibold">{app.downloads}</span>
                            </div>
                          </div>
                          <Button
                            className={`text-white px-6 py-2 ${
                              index === 0 ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                            }`}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </m.div>
        )}        {/* App Detail Modal */}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Badge className={`mb-3 ${
                        selectedApp.platform === 'Mobile' 
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      }`}>
                        {selectedApp.category}
                      </Badge>
                      <h3 className="text-3xl font-bold text-white mb-4">{selectedApp.title}</h3>
                      <p className="text-white/80 leading-relaxed">{selectedApp.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-2xl p-4 text-center">
                        <div className={`text-2xl font-bold mb-1 ${
                          selectedApp.platform === 'Mobile' ? 'text-purple-400' : 'text-blue-400'
                        }`}>{selectedApp.rating}</div>
                        <div className="text-white/60 text-sm">App Rating</div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 text-center">
                        <div className={`text-2xl font-bold mb-1 ${
                          selectedApp.platform === 'Mobile' ? 'text-purple-400' : 'text-blue-400'
                        }`}>{selectedApp.downloads}</div>
                        <div className="text-white/60 text-sm">Downloads</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Features</h4>
                      <div className="space-y-2">
                        {selectedApp.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 text-white/80">
                            <div className={`w-2 h-2 rounded-full ${
                              selectedApp.platform === 'Mobile' ? 'bg-purple-400' : 'bg-blue-400'
                            }`}></div>
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
                  </div>                  <div className="relative">
                    <div className="sticky top-4 space-y-4">
                      {/* Main Preview Image */}
                      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                        <img
                          src={selectedApp.preview}
                          alt={selectedApp.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Screenshots Gallery */}
                      {selectedApp.screenshots && selectedApp.screenshots.length > 1 && (
                        <div className="grid grid-cols-3 gap-2">
                          {selectedApp.screenshots.map((screenshot, idx) => (
                            <div 
                              key={idx} 
                              className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 shadow-lg cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                              onClick={() => setSelectedApp({...selectedApp, preview: screenshot})}
                            >
                              <img
                                src={screenshot}
                                alt={`${selectedApp.title} Screenshot ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>                <div className="flex justify-end gap-3 mt-8">
                  <Button
                    onClick={() => setSelectedApp(null)}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Close
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

export default AppShowcase;
