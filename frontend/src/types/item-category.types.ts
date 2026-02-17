import type { NameResponse } from "./gen.types";

export type Item = {
  id: number;
  name: string;
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
  type: "integration" | "working" | "regular" | "";
};

export type EditItemRequest = Partial<NewItemRequest> & {
  id: number;
};

export type EditItemPayload = Omit<EditItemRequest, "id">;
