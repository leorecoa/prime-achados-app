
import { Smartphone, Home, Heart, Baby, Gift, Star } from 'lucide-react';
import { Category } from '@/hooks/use-supabase';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: Category[];
}

const CategoryFilter = ({ activeCategory, onCategoryChange, categories = [] }: CategoryFilterProps) => {
  // Fallback para categorias caso o banco de dados não retorne dados
  const defaultCategories = [
    { id: 'all', label: 'Todos', icon: 'Star' },
    { id: 'electronics', label: 'Eletrônicos', icon: 'Smartphone' },
    { id: 'home', label: 'Casa', icon: 'Home' },
    { id: 'beauty', label: 'Beleza', icon: 'Heart' },
    { id: 'kids', label: 'Infantil', icon: 'Baby' },
    { id: 'coupons', label: 'Cupons', icon: 'Gift' },
  ];

  const categoriesToRender = categories.length > 0 ? categories : defaultCategories;

  // Mapa de ícones para renderização dinâmica
  const iconMap: Record<string, React.ElementType> = {
    Star,
    Smartphone,
    Home,
    Heart,
    Baby,
    Gift
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm sticky top-16 z-30 py-4 border-b border-orange-200">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
          {categoriesToRender.map((category) => {
            const Icon = iconMap[category.icon] || Star;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-orange text-white shadow-lg transform scale-105'
                    : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
