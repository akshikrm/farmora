export type Item = {
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
  batch_id: number;
  status: string;
  payment_type: "credit" | "paid";
  type: "integration" | "working" | null;
};

export type NewPurchaseRequest = {
  name: string;
  total_price: number;
  net_amount: number;
  invoice_number: string;
  invoice_date: string;
  quantity: number;
  vendor_id: number | null;
  season_id: number | null;
  discount_price: number;
  price_per_unit: number;
  category_id: number | null;
  batch_id: number | null;
  assign_quantity: number;
  payment_type: "credit" | "paid" | null;
};

export type ItemFilterRequest = {
  name: string;
  vendor_id: number | null;
  category_id: number | null;
  batch_id: number | null;
  start_date: string;
  end_date: string;
};

export type EditItemRequest = Partial<NewPurchaseRequest> & {
  id: number;
};

export type EditItemPayload = Omit<EditItemRequest, "id">;
