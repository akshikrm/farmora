export type PurchaseBookItem = {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  invoice_number: string;
  invoice_date: string;
  vendor: {
    id: number;
    name: string;
  };
  total_price: number;
  discount_price: number;
  net_amount: number;
  quantity: number;
  price_per_unit: number;
  payment_type: 'credit' | 'paid';
};

export type PurchaseBookFilterRequest = {
  vendor_id: number | null;
  start_date: string;
  end_date: string;
};
