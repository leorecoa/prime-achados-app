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

