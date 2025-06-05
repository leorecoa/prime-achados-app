import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4">
      <div className="flex space-x-2 min-w-max">
        <button
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === null 
              ? "bg-gradient-to-r from-orange-600 to-rose-500 text-white shadow-md shadow-orange-500/20" 
              : "bg-white text-gray-700 border border-gray-200 hover:border-orange-200 hover:bg-orange-50"
          }`}
          onClick={() => onCategoryChange(null)}
          type="button"
        >
          Todos
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category 
                ? "bg-gradient-to-r from-orange-600 to-rose-500 text-white shadow-md shadow-orange-500/20" 
                : "bg-white text-gray-700 border border-gray-200 hover:border-orange-200 hover:bg-orange-50"
            }`}
            onClick={() => onCategoryChange(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Indicador de rolagem horizontal */}
      <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden hidden md:block">
        <div className="h-full w-1/3 bg-gradient-to-r from-orange-600/30 to-rose-500/30 rounded-full"></div>
      </div>
    </div>
  );
};

export default CategoryFilter;