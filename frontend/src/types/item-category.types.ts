import type { NameResponse } from "./gen.types";

export type Item = {
  id: number;
  name: string;
  base_price: number;
  vendor: {
    id: number;
    name: string;
  };
  type: "integration" | "working" | "regular";
};

export type ItemName = NameResponse & {
  type: "integration" | "working" | "regular";
};

export type NewItemRequest = {
  name: string;
  vendor_id: number | "";
  base_price: number | "";
  type: "integration" | "working" | "regular" | "";
};

export type EditItemRequest = Partial<NewItemRequest> & {
  id: number;
};

export type EditItemPayload = Omit<EditItemRequest, "id">;
