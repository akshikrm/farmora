import itemCategory from "@api/item-category.api";
import type { ItemCategoryName } from "@app-types/item-category.types";
import useGetNames from "@hooks/use-get-names";

const useGetItemCategoryName = () => {
  const query = useGetNames<ItemCategoryName[]>({
    queryFn: itemCategory.getNames,
    queryKey: "item-category:names",
  });

  return query;
};

export default useGetItemCategoryName;
