import itemCategory from "@api/item-category.api";
import type { ItemCategory } from "@app-types/item-category.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import useGetAll from "@hooks/use-get-all";
import { EditIcon } from "lucide-react";

const headers = ["ID", "Name", "Action"];

type Props = {
  onEdit: (selectedId: number) => void;
};

const ItemCategoryTable = ({ onEdit }: Props) => {
  const itemCategoryList = useGetAll<ItemCategory>({
    queryFn: itemCategory.fetchAll,
    queryKey: "item-category:all",
  });

  return (
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
  );
};

export default ItemCategoryTable;
