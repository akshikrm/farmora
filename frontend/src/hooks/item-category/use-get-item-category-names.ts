import type { ItemName } from "@pages/items/types";
import items from "@pages/items/api";
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
