
import React from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Project } from './ProjectCard';

interface ProjectModalProps {
  selectedProject: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ selectedProject, onClose }: ProjectModalProps) => {
  return (
    <AnimatePresence>
      {selectedProject && (
        <m.div 
          className="fixed inset-0 z-50 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div 
            className="bg-navy-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            
            <p className="text-white/80 mb-4">{selectedProject.description}</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-white/5">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Key Features</h4>
                <ul className="list-disc list-inside text-white/80 space-y-1">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              {selectedProject.metrics && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProject.metrics.users && (
                      <div className="text-center p-3 bg-navy-700 rounded-lg">
                        <div className="text-xl font-bold text-techpurple">{selectedProject.metrics.users}</div>
                        <div className="text-sm text-white/60">Users</div>
                      </div>
                    )}
                    {selectedProject.metrics.transactions && (
                      <div className="text-center p-3 bg-navy-700 rounded-lg">
                        <div className="text-xl font-bold text-green-400">{selectedProject.metrics.transactions}</div>
                        <div className="text-sm text-white/60">Transactions</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
