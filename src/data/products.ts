export interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  discount?: number;
  rating?: number;
  category?: string;
  affiliateLink: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Galaxy Premium 128GB',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&format=webp',
    originalPrice: 1299.99,
    discountPrice: 899.99,
    discount: 31,
    rating: 4.8,
    category: 'electronics',
    affiliateLink: 'https://amzn.to/45eaCUr',
    description: 'Smartphone com tela AMOLED de 6.5", processador octa-core e câmera de 108MP.'
  },
  {
    id: '2',
    name: 'Fone de Ouvido Bluetooth Premium',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop&format=webp',
    originalPrice: 299.99,
    discountPrice: 179.99,
    discount: 40,
    rating: 4.6,
    category: 'electronics',
    affiliateLink: 'https://amzn.to/45eaCUr',
    description: 'Fone de ouvido com cancelamento de ruído, bateria de 30 horas e conexão multiponto.'
  },
  {
    id: '3',
    name: 'Cafeteira Elétrica Automática',
    image: 'https://images.unsplash.com/photo-1581269876861-82cce4f6e83b?w=800&h=800&fit=crop&format=webp',
    originalPrice: 249.99,
    discountPrice: 149.99,
    discount: 40,
    rating: 4.7,
    category: 'home',
    affiliateLink: 'https://amzn.to/45eaCUr',
    description: 'Cafeteira programável com reservatório de 1.5L e sistema antigotejamento.'
  },
  {
    id: '4',
    name: 'Kit Skincare Completo',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop&format=webp',
    originalPrice: 199.99,
    discountPrice: 119.99,
    discount: 40,
    rating: 4.9,
    category: 'beauty',
    affiliateLink: 'https://amzn.to/45eaCUr',
    description: 'Kit com limpador facial, tônico, sérum e hidratante para todos os tipos de pele.'
  },
  {
    id: '5',
    name: 'Brinquedo Educativo Interativo',
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=800&h=800&fit=crop&format=webp',
    originalPrice: 89.99,
    discountPrice: 59.99,
    discount: 33,
    rating: 4.8,
    category: 'kids',
    affiliateLink: 'https://amzn.to/45eaCUr',
    description: 'Brinquedo educativo que estimula o raciocínio lógico e a coordenação motora.'
  },
  {
    id: '6',
    name: 'Smart Watch Fitness',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop&format=webp',
    originalPrice: 399.99,
    discountPrice: 249.99,
    discount: 38,
    rating: 4.5,
    category: 'electronics',
    affiliateLink: 'https://amzn.to/45eaCUr',
    description: 'Smartwatch com monitoramento cardíaco, GPS integrado e mais de 20 modos de exercício.'
  },
  {
    id: '7',
    name: 'Notebook Gamer RGB',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop&format=webp',
    originalPrice: 3499.99,
    discountPrice: 2299.99,
    discount: 34,
    rating: 4.7,
    category: 'electronics',
    affiliateLink: 'https://amzn.to/45eaCUr',
    description: 'Notebook com processador de última geração, placa de vídeo dedicada e teclado RGB.'
  },
  {
    id: '8',
    name: 'Aspirador de Pó Robot',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&format=webp',
    originalPrice: 899.99,
    discountPrice: 599.99,
    discount: 33,
    rating: 4.6,
    category: 'home',
    affiliateLink: 'https://amzn.to/45eaCUr',
    description: 'Aspirador robô com mapeamento inteligente, controle por aplicativo e função de mopping.'
  },
  {
    id: '9',
    name: 'Fone de Ouvido Bluetooth',
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&h=800&fit=crop&format=webp',
    originalPrice: 199.90,
    discountPrice: 149.90,
    discount: 25,
    rating: 4.4,
    affiliateLink: 'https://exemplo.com/fone-bluetooth',
    description: 'Fone de ouvido bluetooth com cancelamento de ruído e bateria de longa duração.',
    category: 'electronics'
  },
  {
    id: '10',
    name: 'Smartwatch Fitness',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop&format=webp',
    originalPrice: 299.90,
    discountPrice: 249.90,
    discount: 17,
    rating: 4.3,
    affiliateLink: 'https://exemplo.com/smartwatch',
    description: 'Smartwatch com monitor cardíaco, contador de passos e notificações.',
    category: 'electronics'
  },
  {
    id: '11',
    name: 'Mochila para Notebook',
    image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800&h=800&fit=crop&format=webp',
    originalPrice: 149.90,
    discountPrice: 119.90,
    discount: 20,
    rating: 4.5,
    affiliateLink: 'https://exemplo.com/mochila',
    description: 'Mochila resistente à água com compartimento acolchoado para notebook.',
    category: 'accessories'
  }
];