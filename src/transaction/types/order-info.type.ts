export type OrderInfoType = {
  // order_id: string;
  email: string;
  amount: number;
  currency: 'EUR' | 'USD' | 'GBP';
  return_url: string;
};
