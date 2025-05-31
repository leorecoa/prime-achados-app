import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === null ? "categorySelected" : "category"}
        onClick={() => onCategoryChange(null)}
        className="rounded-full"
        type="button"
      >
        Todos
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "categorySelected" : "category"}
          onClick={() => onCategoryChange(category)}
          className="rounded-full"
          type="button"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;