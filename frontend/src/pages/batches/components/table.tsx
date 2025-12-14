import batches from "@api/batches.api";
import type { Batch } from "@app-types/batch.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import useGetAll from "@hooks/use-get-all";
import dayjs from "dayjs";
import { EditIcon } from "lucide-react";

const headers = ["ID", "Name", "Status", "Farm Name", "Season Name", "Action"];

type Props = {
  onEdit: (selectedId: number) => void;
};

const BatchTable = ({ onEdit }: Props) => {
  const batchList = useGetAll<Batch>({
    queryFn: batches.fetchAll,
    queryKey: "batch:all",
  });

  console.log(batchList.data.data);
  return (
    <Table>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell key={header} content={header} />
        ))}
      </TableRow>
      {batchList.data.data.map((season, i) => (
        <TableRow key={season.id}>
          <TableCell content={i + 1} />
          <TableCell content={season.name} />
          <TableCell content={season.status} />
          <TableCell content={season.farm?.name || "-"} />
          <TableCell content={season.season?.name || "-"} />
          <TableCell
            content={
              <EditIcon
                className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => {
                  onEdit(season.id);
                }}
              />
            }
          />
        </TableRow>
      ))}
    </Table>
  );
};

export default BatchTable;
