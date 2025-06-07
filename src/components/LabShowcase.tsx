
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ResearchProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  githubUrl?: string;
  paperUrl?: string;
  image: string;
};

const researchProjects: ResearchProject[] = [
  {
    id: 'multimodal',
    title: 'Multimodal Understanding Framework',
    category: 'Ai based resume analyser',
    description: 'A novel approach to integrating visual and textual information for more comprehensive AI understanding.',
    githubUrl: 'https://github.com/Ayushant/resume-insight-ai-lab/',
    // paperUrl: 'https://arxiv.org/abs/2304.xxxxx',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
  },
  {
    id: 'fedlearn',
    title: 'Privacy-Preserving Federated Learning',
    category: 'AI chatbot',
    description: 'Enabling collaborative model training across organizations without sharing sensitive data.',
    githubUrl: 'https://github.com/Ayushant/ai-chatbot',
    // paperUrl: 'https://arxiv.org/abs/2305.xxxxx',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
  },
  {
    id: 'neuromorphic',
    title: ' AI-Powered Log File Analyzer',
    category: 'Neuromorphic Computing Architecture',
    description: 'Brain-inspired computing systems that improve energy efficiency for AI workloads.',
    // paperUrl: 'https://arxiv.org/abs/2306.xxxxx',
    image: 'https://images.unsplash.com/photo-1581089781785-603411fa81e5?w=800&auto=format&fit=crop',
  },
];

const LabShowcase = () => {
  return (
    <section id="lab" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <div className="absolute bottom-40 -left-40 w-80 h-80 rounded-full bg-neon-purple/10 blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold heading-gradient mb-5">Research Lab</h2>
            <p className="text-white/70 max-w-2xl">
              Exploring the frontiers of artificial intelligence through cutting-edge research and open innovation.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <a 
              href="#contact" 
              className="inline-flex items-center text-techpurple hover:text-techpurple-light"
            >
              View all research <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card group h-full flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-xs text-elecblue font-semibold uppercase tracking-wider mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-white/70 text-sm mb-4 flex-1">{project.description}</p>
                
                <div className="flex gap-3 mt-auto">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-xs px-3 py-2 rounded-full transition-colors",
                        "bg-white/5 hover:bg-white/10 text-white/80"
                      )}
                    >
                      GitHub Repo
                    </a>
                  )}
                  {project.paperUrl && (
                    <a 
                      href={project.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-xs px-3 py-2 rounded-full transition-colors",
                        "bg-white/5 hover:bg-white/10 text-white/80"
                      )}
                    >
                      Research Paper
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabShowcase;
