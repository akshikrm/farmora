export type Item = {
  id: number;
  name: string;
};

export type NewItemRequest = {
  name: string;
  total_price: number;
  quantity: number;
  vendor_id: number;
  discount_price: number;
  price_per_unit: number;
  category_id: number;
  batch_id: number;
  assign_quantity: number;
};

export type EditItemRequest = Partial<NewItemRequest> & {
  id: number;
};

export type EditItemPayload = Omit<EditItemRequest, "id">;
