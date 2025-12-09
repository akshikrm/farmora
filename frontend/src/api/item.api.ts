import type {
  NewItemRequest,
  EditItemPayload,
  EditItemRequest,
} from "@app-types/item.types";
import fetcher from "@utils/fetcher";

const item = {
  fetchAll: () => fetcher("items"),
  fetchById: (id: number) => fetcher(`items/${id}`),
  create: async (payload: NewItemRequest) =>
    await fetcher("items", JSON.stringify(payload), {
      method: "POST",
    }),
  updateById: async (id: number, updateData: EditItemRequest) => {
    const payload: EditItemPayload = {
      name: updateData.name,
    };
    return await fetcher(`items/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
};

export default item;
