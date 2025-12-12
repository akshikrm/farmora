import itemCategory from "@api/item-category.api";
import type { ItemCategoryName } from "@app-types/item-category.types";
import useGetAll from "@hooks/use-get-all";

const useGetItemCategoryName = () => {
  const query = useGetAll<ItemCategoryName[]>({
    queryFn: itemCategory.getNames,
    queryKey: "item-category:names",
  });

  return query;
};

export default useGetItemCategoryName;
