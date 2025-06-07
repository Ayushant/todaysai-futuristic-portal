
import React from 'react';
import { motion as m } from 'framer-motion';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';

interface Category {
  id: string;
  label: string;
}

interface PortfolioFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const PortfolioFilters = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange
}: PortfolioFiltersProps) => {
  return (
    <m.div 
      className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        placeholder="Search projects..."
      />
      
      <CategoryFilter
        categories={categories.map(cat => ({ id: cat.id, label: cat.label }))}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </m.div>
  );
};

export default PortfolioFilters;
export type { Category };
