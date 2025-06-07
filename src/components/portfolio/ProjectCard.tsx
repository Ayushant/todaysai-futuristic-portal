
import React, { useCallback } from 'react';
import { motion as m } from 'framer-motion';
import { ExternalLink, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Project = {
  id: string;
  title: string;
  url?: string;
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

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard = React.memo(({ project, onClick }: ProjectCardProps) => {
  const handleClick = useCallback(() => {
    onClick(project);
  }, [project, onClick]);
  
  return (
    <m.div 
      className="glass-card h-full group cursor-pointer relative overflow-hidden"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={handleClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
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
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
export type { Project };
