import item from "@api/item.api";
import type { Item } from "@app-types/item.types";
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

const ItemTable = ({ onEdit }: Props) => {
  const itemCategoryList = useGetAll<Item>({
    queryFn: item.fetchAll,
    queryKey: "item:all",
  });

  return (
    <Table>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell key={header} content={header} />
        ))}
      </TableRow>
      {itemCategoryList.data.data.map((item, i) => (
        <TableRow key={item.id}>
          <TableCell content={i + 1} />
          <TableCell content={item.name} />
          <TableCell
            content={
              <EditIcon
                className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => {
                  onEdit(item.id);
                }}
              />
            }
          />
        </TableRow>
      ))}
    </Table>
  );
};

export default ItemTable;
