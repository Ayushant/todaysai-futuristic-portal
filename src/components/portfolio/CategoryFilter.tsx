
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  label: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={`
            ${selectedCategory === category.id 
              ? 'bg-techpurple hover:bg-techpurple/80 text-white' 
              : 'bg-transparent border-navy-600 text-white/70 hover:bg-navy-800/50 hover:text-white'
            }
          `}
        >
          <Filter className="w-4 h-4 mr-2" />
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
