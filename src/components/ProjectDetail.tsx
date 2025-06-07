import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Users, DollarSign, TrendingUp, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Project type definition
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
  metrics?: {
    users?: string;
    transactions?: string;
    performance?: string;
  };
  date?: string;
}

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-navy-200/80 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-4xl bg-navy-200 border border-white/10 rounded-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover" 
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-200 to-transparent"></div>
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-4 items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <div className="flex items-center gap-1">
                  <Tag size={16} />
                  <span>{project.type}</span>
                </div>
                {project.date && (
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{project.date}</span>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              size="sm" 
              className="bg-techpurple hover:bg-techpurple/80 text-white flex items-center gap-2"
              onClick={() => window.open(project.url, '_blank')}
            >
              <span>Visit Project</span>
              <ExternalLink size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <h4 className="text-white font-semibold mb-3">Project Description</h4>
              <p className="text-white/70">{project.description}</p>
              
              {project.features && project.features.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70">
                        <span className="inline-block w-1 h-1 rounded-full bg-techpurple mt-2"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} className="bg-white/10 hover:bg-white/20">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              {project.metrics && (
                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-3">Project Metrics</h4>
                  <div className="space-y-3">
                    {project.metrics.users && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                          <Users size={20} className="text-elecblue" />
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Active Users</p>
                          <p className="text-white font-medium">{project.metrics.users}</p>
                        </div>
                      </div>
                    )}
                    
                    {project.metrics.transactions && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                          <DollarSign size={20} className="text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Transactions</p>
                          <p className="text-white font-medium">{project.metrics.transactions}</p>
                        </div>
                      </div>
                    )}
                    
                    {project.metrics.performance && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                          <TrendingUp size={20} className="text-techpurple" />
                        </div>
                        <div>
                          <p className="text-sm text-white/60">Performance</p>
                          <p className="text-white font-medium">{project.metrics.performance}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
