
export interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  rating: number;
  category: string;
  affiliateLink: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Galaxy Premium 128GB',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    originalPrice: 1299.99,
    discountPrice: 899.99,
    discount: 31,
    rating: 4.8,
    category: 'electronics',
    affiliateLink: 'https://amzn.to/45eaCUr'
  },
  {
    id: '2',
    name: 'Fone de Ouvido Bluetooth Premium',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
    originalPrice: 299.99,
    discountPrice: 179.99,
    discount: 40,
    rating: 4.6,
    category: 'electronics',
    affiliateLink: 'https://amzn.to/45eaCUr'
  },
  {
    id: '3',
    name: 'Cafeteira Elétrica Automática',
    image: 'https://images.unsplash.com/photo-1581269876861-82cce4f6e83b?w=500',
    originalPrice: 249.99,
    discountPrice: 149.99,
    discount: 40,
    rating: 4.7,
    category: 'home',
    affiliateLink: 'https://amzn.to/45eaCUr'
  },
  {
    id: '4',
    name: 'Kit Skincare Completo',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    originalPrice: 199.99,
    discountPrice: 119.99,
    discount: 40,
    rating: 4.9,
    category: 'beauty',
    affiliateLink: 'https://amzn.to/45eaCUr'
  },
  {
    id: '5',
    name: 'Brinquedo Educativo Interativo',
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=500',
    originalPrice: 89.99,
    discountPrice: 59.99,
    discount: 33,
    rating: 4.8,
    category: 'kids',
    affiliateLink: 'https://amzn.to/45eaCUr'
  },
  {
    id: '6',
    name: 'Smart Watch Fitness',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
    originalPrice: 399.99,
    discountPrice: 249.99,
    discount: 38,
    rating: 4.5,
    category: 'electronics',
    affiliateLink: 'https://amzn.to/45eaCUr'
  },
  {
    id: '7',
    name: 'Notebook Gamer RGB',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    originalPrice: 3499.99,
    discountPrice: 2299.99,
    discount: 34,
    rating: 4.7,
    category: 'electronics',
    affiliateLink: 'https://amzn.to/45eaCUr'
  },
  {
    id: '8',
    name: 'Aspirador de Pó Robot',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    originalPrice: 899.99,
    discountPrice: 599.99,
    discount: 33,
    rating: 4.6,
    category: 'home',
    affiliateLink: 'https://amzn.to/45eaCUr'
  }
];
