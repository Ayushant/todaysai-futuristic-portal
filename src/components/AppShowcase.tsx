
import React, { useState, useRef } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Smartphone, Monitor, Tablet, Play, ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Premium app samples with real-looking data
const appSamples = [
  {
    id: 1,
    title: 'FinanceFlow',
    category: 'FinTech',
    description: 'AI-powered personal finance management with real-time insights and predictive analytics.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=600&fit=crop&q=80',
    preview: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80',
    rating: 4.9,
    downloads: '500K+',
    features: ['Real-time Analytics', 'AI Insights', 'Secure Banking', 'Investment Tracking'],
    tech: ['React Native', 'AI/ML', 'Blockchain', 'TypeScript']
  },
  {
    id: 2,
    title: 'HealthHub Pro',
    category: 'Healthcare',
    description: 'Comprehensive health monitoring platform with telemedicine and wellness tracking.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=600&fit=crop&q=80',
    preview: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    rating: 4.8,
    downloads: '1M+',
    features: ['Health Monitoring', 'Telemedicine', 'Wellness Plans', 'Emergency Features'],
    tech: ['Flutter', 'IoT Integration', 'Cloud Sync', 'Real-time Data']
  },
  {
    id: 3,
    title: 'EduSphere',
    category: 'Education',
    description: 'Interactive learning platform with AR/VR integration and personalized curricula.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=600&fit=crop&q=80',
    preview: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop&q=80',
    rating: 4.7,
    downloads: '750K+',
    features: ['AR/VR Learning', 'Personalized AI', 'Progress Tracking', 'Interactive Content'],
    tech: ['React Native', 'AR/VR', 'AI Tutoring', 'Cloud Platform']
  },
  {
    id: 4,
    title: 'TravelMate AI',
    category: 'Travel',
    description: 'Smart travel companion with AI trip planning and real-time local recommendations.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop&q=80',
    preview: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&q=80',
    rating: 4.9,
    downloads: '300K+',
    features: ['AI Trip Planning', 'Local Insights', 'Real-time Updates', 'Offline Maps'],
    tech: ['Native iOS/Android', 'Machine Learning', 'GPS Integration', 'Cloud Services']
  }
];

const AppShowcase = () => {
  const [selectedApp, setSelectedApp] = useState<typeof appSamples[0] | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % appSamples.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + appSamples.length) % appSamples.length);
  };

  const deviceIcon = {
    mobile: Smartphone,
    tablet: Tablet,
    desktop: Monitor
  };

  const DeviceIcon = deviceIcon[deviceView];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-techpurple/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-elecblue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-techpurple to-elecblue rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              Premium App Portfolio
            </h2>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Discover our award-winning mobile applications that have transformed user experiences across industries
          </p>
        </m.div>

        {/* Device View Toggle */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-2 border border-white/10">
            {(['mobile', 'tablet', 'desktop'] as const).map((device) => {
              const Icon = deviceIcon[device];
              return (
                <button
                  key={device}
                  onClick={() => setDeviceView(device)}
                  className={`px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 ${
                    deviceView === device
                      ? 'bg-techpurple text-white shadow-lg shadow-techpurple/25'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  <span className="capitalize">{device}</span>
                </button>
              );
            })}
          </div>
        </m.div>

        {/* Featured App Carousel */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* App Preview */}
              <div className="relative">
                <div className={`relative mx-auto ${
                  deviceView === 'mobile' ? 'w-64 h-[520px]' :
                  deviceView === 'tablet' ? 'w-80 h-[480px]' :
                  'w-full h-[400px]'
                } bg-gray-900 rounded-3xl p-4 shadow-2xl`}>
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-white">
                    <img
                      src={appSamples[currentSlide].preview}
                      alt={appSamples[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Device indicators */}
                  {deviceView === 'mobile' && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-700 rounded-full"></div>
                  )}
                </div>
                
                {/* Floating metrics */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-techpurple to-elecblue p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-2 text-white">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{appSamples[currentSlide].rating}</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20">
                  <div className="text-white/80 text-sm">Downloads</div>
                  <div className="text-white font-bold text-lg">{appSamples[currentSlide].downloads}</div>
                </div>
              </div>

              {/* App Details */}
              <div className="space-y-6">
                <div>
                  <Badge className="mb-3 bg-techpurple/20 text-techpurple border-techpurple/30">
                    {appSamples[currentSlide].category}
                  </Badge>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {appSamples[currentSlide].title}
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {appSamples[currentSlide].description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {appSamples[currentSlide].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-white/70">
                        <div className="w-1.5 h-1.5 bg-techpurple rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Technology</h4>
                  <div className="flex flex-wrap gap-2">
                    {appSamples[currentSlide].tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white/10 text-white/80 rounded-lg text-sm border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setSelectedApp(appSamples[currentSlide])}
                    className="bg-gradient-to-r from-techpurple to-elecblue hover:from-techpurple/80 hover:to-elecblue/80 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-techpurple/25"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-xl"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-3">
                {appSamples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'bg-techpurple scale-125' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </m.div>

        {/* App Gallery Grid */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {appSamples.map((app, index) => (
            <m.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedApp(app)}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 hover:border-techpurple/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-techpurple/20">
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-gray-900">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white">{app.title}</h4>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs">{app.rating}</span>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm line-clamp-2">{app.description}</p>
                  <Badge variant="outline" className="bg-white/5 text-xs">
                    {app.category}
                  </Badge>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>

        {/* App Detail Modal */}
        <AnimatePresence>
          {selectedApp && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-navy-900/95 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setSelectedApp(null)}
            >
              <m.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Badge className="mb-3 bg-techpurple/20 text-techpurple border-techpurple/30">
                        {selectedApp.category}
                      </Badge>
                      <h3 className="text-3xl font-bold text-white mb-4">{selectedApp.title}</h3>
                      <p className="text-white/80 leading-relaxed">{selectedApp.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-techpurple mb-1">{selectedApp.rating}</div>
                        <div className="text-white/60 text-sm">App Rating</div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 text-center">
                        <div className="text-2xl font-bold text-elecblue mb-1">{selectedApp.downloads}</div>
                        <div className="text-white/60 text-sm">Downloads</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Features</h4>
                      <div className="space-y-2">
                        {selectedApp.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 text-white/80">
                            <div className="w-2 h-2 bg-techpurple rounded-full"></div>
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
                      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                        <img
                          src={selectedApp.preview}
                          alt={selectedApp.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <Button
                    onClick={() => setSelectedApp(null)}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Close
                  </Button>
                  <Button className="bg-gradient-to-r from-techpurple to-elecblue hover:from-techpurple/80 hover:to-elecblue/80 text-white">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Demo
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
