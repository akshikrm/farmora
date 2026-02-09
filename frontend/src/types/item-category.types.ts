import type { NameResponse } from "./gen.types";

export type ItemCategory = {
  id: number;
  name: string;
  vendor: {
    id: number;
    name: string;
  };
  type: "integration" | "working" | "regular";
};

export type ItemCategoryName = NameResponse & {
  type: "integration" | "working" | "regular";
};

export type NewItemCategoryRequest = {
  name: string;
  vendor_id: number | "";
  type: "integration" | "working" | "regular" | "";
};

export type EditItemCategoryRequest = Partial<NewItemCategoryRequest> & {
  id: number;
};

export type EditItemCategoryPayload = Omit<EditItemCategoryRequest, "id">;
