import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === null 
            ? "bg-orange-500 text-white" 
            : "bg-white text-gray-700 border border-gray-300"
        }`}
        onClick={() => onCategoryChange(null)}
        type="button"
      >
        Todos
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category 
              ? "bg-orange-500 text-white" 
              : "bg-white text-gray-700 border border-gray-300"
          }`}
          onClick={() => onCategoryChange(category)}
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;