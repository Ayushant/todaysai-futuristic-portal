import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "category-filter whitespace-nowrap",
            activeCategory === category ? "category-filter-active" : "category-filter-inactive"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.button>
      ))}
    </div>
  );
};

export default memo(CategoryFilters);
