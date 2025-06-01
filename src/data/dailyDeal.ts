import { Product } from './products';

export interface DailyDeal extends Product {
  discount: number;
  timerConfig?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export const dailyDeal: DailyDeal = {
  id: 'daily-1',
  name: 'Smartphone Ultra Premium 256GB',
  image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=1200&h=675&fit=crop&format=webp',
  originalPrice: 2499.99,
  discountPrice: 1499.99,
  discount: 40,
  rating: 4.9,
  category: 'electronics',
  affiliateLink: 'https://amzn.to/45eaCUr',
  description: 'Smartphone topo de linha com câmera profissional, tela AMOLED de 6.7" e bateria de longa duração.',
  timerConfig: {
    hours: 23,
    minutes: 59,
    seconds: 59
  }
};