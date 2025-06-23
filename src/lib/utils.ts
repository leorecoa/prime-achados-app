import { Product } from "@/data/products";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes do Tailwind de forma eficiente
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um valor para moeda brasileira
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Calcula a porcentagem de desconto entre dois valores
 */
export function calculateDiscount(originalPrice: number, discountPrice: number): number {
  if (originalPrice <= 0) return 0;
  const discount = ((originalPrice - discountPrice) / originalPrice) * 100;
  return Math.round(discount);
}

/**
 * Trunca um texto para um tamanho máximo
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Gera um slug a partir de um texto
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Formata uma data para o formato brasileiro
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Calcula o tempo restante entre duas datas
 */
export function getTimeRemaining(endDate: Date | string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const total = new Date(endDate).getTime() - new Date().getTime();

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
}
export const products: Product[] = [
  {
    id: '1',
    name: 'Bicicleta Aro 29 GT Sprint MX7 24V index Freio Disco Alumínio Suspensão Aero MTB',
    image: 'https://down-zl-br.img.susercontent.com/br-11134207-7r98o-m5ahnmktxi2a11.webp',
    originalPrice: 1099.99,
    discountPrice: 754.00,
    discount: 31,
    rating: 4.8,
    category: 'bicicletas',
    affiliateLink: 'https://amzn.to/45eaCUr',
    description: 'Bicicleta Aro 29 GT Sprint MX7 24V index Freio Disco Alumínio Suspensão Aero MTB.'
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
