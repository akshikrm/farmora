import { useState } from "react";
import { itemTypes } from "..";
import items from "../api";
import type { ItemName } from "../types";

const useGetItemsByVendorId = () => {
  const [itemList, setItemList] = useState<ItemName[]>([]);

  const handleGetItemsByVendorID = async (vendorId: number) => {
    const res = await items.getByVendorId(vendorId);
    if (res.status === "success") {
      if (res.data) {
        const formatedData: ItemName[] = res.data.map(
          ({ id, base_price, type, name }) => {
            const test = itemTypes.find(({ value }) => value === type);
            return {
              id,
              base_price,
              name: test!.label || name,
              type: type,
            };
          },
        );
        setItemList(formatedData);
        return;
      }
    }
    setItemList([]);
  };

  return { itemList, handleGetItemsByVendorID };
};

export default useGetItemsByVendorId;
