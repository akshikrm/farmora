import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import { EditIcon } from "lucide-react";
import { useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import type { BatchListResponse } from "../types";

const headers = ["ID", "Name", "Status", "Farm Name", "Season Name", "Action"];

type Props = {
  onEdit: (selectedId: number) => void;
  data: BatchListResponse;
};

const BatchTable = ({ onEdit, data }: Props) => {
  const isEmpty = useMemo(() => {
    return data.data.length === 0;
  }, [data.data]);

  return (
    <>
      <Table>
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header} content={header} />
          ))}
        </TableRow>
        {data.data.map((season, i) => (
          <TableRow key={season.id}>
            <TableCell content={i + 1} />
            <TableCell content={season.name} />
            <TableCell
              content={<span className="capitalize">{season.status}</span>}
            />
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
      <Ternary
        when={isEmpty}
        then={
          <DataNotFound
            title="No batches found"
            description="Get started by creating a new batch"
          />
        }
      />
    </>
  );
};

export default BatchTable;
