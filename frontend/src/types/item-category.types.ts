export type ItemCategory = {
  id: number;
  name: string;
};

export type NewItemCategoryRequest = {
  name: string;
};

export type EditItemCategoryRequest = Partial<NewItemCategoryRequest> & {
  id: number;
};

export type EditItemCategoryPayload = Omit<EditItemCategoryRequest, "id">;
