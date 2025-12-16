import batches from "@api/batches.api";
import type { Batch } from "@app-types/batch.types";
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

const headers = ["ID", "Name", "Status", "Farm Name", "Season Name", "Action"];

type Props = {
  onEdit: (selectedId: number) => void;
};

const BatchTable = ({ onEdit }: Props) => {
  const batchList = useGetAll<Batch>({
    queryFn: batches.fetchAll,
    queryKey: "batch:all",
  });

  const isEmpty = useMemo(() => {
    return batchList.data?.data.length === 0;
  }, [batchList.data]);

  const isFirstLoading = useMemo(() => {
    return batchList.isLoading || (isEmpty && !batchList.isFetched);
  }, [batchList.isLoading, isEmpty, batchList.isFetched]);

  console.log(batchList.data.data);
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
      }
    />
  );
};

export default BatchTable;
