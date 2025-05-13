
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

const timelineItems: TimelineItem[] = [
  {
    year: '2018',
    title: 'Founded in Pune',
    description: 'Started as an AI research lab with 5 engineers focused on computer vision.'
  },
  {
    year: '2020',
    title: 'First Product Launch',
    description: 'Released VisionCore API, enabling businesses to implement advanced image recognition.'
  },
  {
    year: '2021',
    title: 'Global Expansion',
    description: 'Opened offices in Singapore and Berlin, expanding our team to 50+ AI specialists.'
  },
  {
    year: '2022',
    title: 'Series A Funding',
    description: 'Secured $12M in funding to accelerate R&D and product development.'
  },
  {
    year: '2023',
    title: 'Enterprise Solutions',
    description: 'Launched AI Team as a Service for enterprise clients across 4 continents.'
  },
  {
    year: '2024',
    title: 'Research Breakthroughs',
    description: 'Published groundbreaking research on multimodal learning, cited in 30+ academic papers.'
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-navy-200/30">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <div className="absolute top-40 -left-40 w-80 h-80 rounded-full bg-techpurple/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-neon-blue/10 blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold heading-gradient mb-5">About TodaysAi</h2>
          <p className="text-white/70">
            From humble beginnings in Pune to a global AI innovator, our journey is fueled by a passion
            for creating intelligent technologies that solve real-world problems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Company description */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">Your AI Partner</h3>
            <p className="text-white/80 mb-4">
              TodaysAi was founded with a clear mission: to democratize advanced AI technologies and make them accessible
              to organizations of all sizes. Based in Pune's innovation hub, we combine deep technical expertise with a
              thorough understanding of business challenges.
            </p>
            <p className="text-white/80 mb-4">
              Our team of 100+ AI specialists, data scientists, and engineers work at the cutting edge of machine learning,
              computer vision, and natural language processing. We're committed to responsible AI development that considers
              ethical implications and prioritizes transparency.
            </p>
            <p className="text-white/80">
              With R&D centers in India, Singapore, and Germany, we blend diverse perspectives to create AI solutions that
              work across cultural and geographical boundaries. Our global approach enables us to deliver technologies that
              are both innovative and inclusive.
            </p>
            
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-3xl font-bold text-techpurple mb-1">100+</h4>
                <p className="text-white/70 text-sm">AI Experts</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-3xl font-bold text-elecblue mb-1">20+</h4>
                <p className="text-white/70 text-sm">Countries</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-3xl font-bold text-neon-green mb-1">50+</h4>
                <p className="text-white/70 text-sm">AI Solutions</p>
              </div>
            </div>
          </div>
          
          {/* Timeline */}
          <div ref={ref} className="relative pl-8">
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-techpurple via-elecblue to-neon-blue"></div>
            
            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="absolute -left-12 w-6 h-6 rounded-full border-2 border-white bg-navy-200"></div>
                  <div className="mb-1 flex items-center">
                    <span className="text-lg font-bold text-techpurple mr-2">{item.year}</span>
                    <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                  </div>
                  <p className="text-white/70">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
