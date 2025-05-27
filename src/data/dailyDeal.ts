
export interface DailyDeal {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  affiliateLink: string;
  description: string;
}

export const dailyDeal: DailyDeal = {
  id: 'daily-1',
  name: 'Smartphone Premium',
  image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
  originalPrice: 1299.99,
  discountPrice: 899.99,
  discount: 31,
  affiliateLink: 'https://amzn.to/45eaCUr',
  description: 'O smartphone mais esperado do ano com câmera profissional!'
};

// Configuração do timer (em horas, minutos, segundos)
export const timerConfig = {
  hours: 23,
  minutes: 45,
  seconds: 30
};
