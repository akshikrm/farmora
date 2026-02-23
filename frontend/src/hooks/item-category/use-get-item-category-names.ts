import items from "@api/item-category.api";
import type { ItemName } from "@app-types/item-category.types";
import { useState, useEffect } from "react";

const useGetItemCategoryName = () => {
  const [state, setState] = useState<ItemName[]>([]);
  useEffect(() => {
    items
      .getNames()
      .then((data) => setState(data))
      .catch((err) => {
        console.log(err);
        setState([]);
      });
  }, []);

  return { data: state };
};

export default useGetItemCategoryName;
