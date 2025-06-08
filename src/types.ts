export interface DailyDeal {
  productId: string;
  discount: number;
  active: boolean;
  startDate?: string;
  endDate?: string;
}