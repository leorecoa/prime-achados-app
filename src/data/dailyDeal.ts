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
  id: "daily-1",
  name: "Headphone Gamer RGB",
  image: "/placeholder.svg",
  originalPrice: 349.90,
  discountPrice: 199.90,
  discount: 43,
  affiliateLink: "https://exemplo.com/headphone-gamer",
  description: "Headphone gamer com iluminação RGB, som surround 7.1 e microfone destacável.",
  category: "Eletrônicos"
};

// Configuração do timer (em horas, minutos, segundos)
export const timerConfig = {
  hours: 23,
  minutes: 45,
  seconds: 30
};