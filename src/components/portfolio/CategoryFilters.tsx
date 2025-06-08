
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CategoryFiltersProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ 
  categories, 
  activeCategory, 
  onChange 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap gap-2"
    >
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(category)}
          className={`
            transition-all duration-200 capitalize
            ${activeCategory === category 
              ? 'bg-techpurple text-white border-techpurple hover:bg-techpurple/90' 
              : 'bg-white/5 text-white/80 border-white/20 hover:bg-white/10 hover:border-white/30'
            }
          `}
        >
          {category}
        </Button>
      ))}
    </motion.div>
  );
};

export default CategoryFilters;
