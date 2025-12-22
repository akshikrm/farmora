import itemCategory from "@api/item-category.api";
import type { ItemCategory } from "@app-types/item-category.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import useGetAll from "@hooks/use-get-all";
import { EditIcon } from "lucide-react";
import { useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";

const headers = ["ID", "Name", "Action"];

type Props = {
  onEdit: (selectedId: number) => void;
};

const ItemCategoryTable = ({ onEdit }: Props) => {
  const itemCategoryList = useGetAll<ItemCategory>({
    queryFn: itemCategory.fetchAll,
    queryKey: "item-category:all",
  });

  const isEmpty = useMemo(() => {
    return itemCategoryList.data?.data.length === 0;
  }, [itemCategoryList.data]);

  const isFirstLoading = useMemo(() => {
    return itemCategoryList.isLoading || (isEmpty && !itemCategoryList.isFetched);
  }, [itemCategoryList.isLoading, isEmpty, itemCategoryList.isFetched]);

  return (
    <Ternary
      when={isFirstLoading}
      then={<DataLoading />}
      otherwise={
        <>
          <Table>
            <TableRow>
              {headers.map((header) => (
                <TableHeaderCell key={header} content={header} />
              ))}
            </TableRow>
            {itemCategoryList.data.data.map((itemCategory, i) => (
              <TableRow key={itemCategory.id}>
                <TableCell content={i + 1} />
                <TableCell content={itemCategory.name} />
                <TableCell
                  content={
                    <EditIcon
                      className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => {
                        onEdit(itemCategory.id);
                      }}
                    />
                  }
                />
              </TableRow>
            ))}
          </Table>
          <Ternary
            when={isEmpty}
            then={
              <DataNotFound
                title="No items found"
                description="Get started by creating a new item"
              />
            }
          />
        </>
      }
    />
  );
};

export default ItemCategoryTable;
