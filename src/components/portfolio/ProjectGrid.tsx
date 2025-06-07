
import React from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProjectCard, { type Project } from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onResetFilters: () => void;
}

const ProjectGrid = ({ projects, onProjectClick, onResetFilters }: ProjectGridProps) => {
  if (projects.length === 0) {
    return (
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
            onClick={onResetFilters}
          >
            Reset Filters
          </Button>
        </m.div>
      </div>
    );
  }

  return (
    <m.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <AnimatePresence mode="wait">
        {projects.map((project, index) => (
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
              onClick={onProjectClick}
            />
          </m.div>
        ))}
      </AnimatePresence>
    </m.div>
  );
};

export default ProjectGrid;
