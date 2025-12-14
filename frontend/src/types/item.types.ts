export type Item = {
  id: number;
  name: string;
};

export type NewItemRequest = {
  name: string;
  total_price: number;
  net_amount: number;
  invoice_number: string;
  invoice_date: string;
  quantity: number;
  vendor_id: number;
  discount_price: number;
  price_per_unit: number;
  category_id: number;
  batch_id: number;
  assign_quantity: number;
};

export type ItemFilterRequest = {
  name: string;
  vendor_id: number | null;
  category_id: number | null;
  batch_id: number | null;
  start_date: string;
  end_date: string;
};

export type EditItemRequest = Partial<NewItemRequest> & {
  id: number;
};

export type EditItemPayload = Omit<EditItemRequest, "id">;
