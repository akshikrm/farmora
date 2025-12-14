import farms from "@api/farms.api";
import type { Farm } from "@app-types/farms.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import useGetAll from "@hooks/use-get-all";
import { EditIcon } from "lucide-react";
import { useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import DataLoading from "@components/data-loading";

const headers = ["ID", "Name", "Place", "Capacity", "Edit"];

type Props = {
  onEdit: (selectedId: number) => void;
};

const FarmTable = ({ onEdit }: Props) => {
  const farmsList = useGetAll<Farm>({
    queryFn: farms.fetchAll,
    queryKey: "farms:all",
  });

  const isEmpty = useMemo(() => {
    return farmsList.data?.data.length === 0;
  }, [farmsList.data]);

  const isFirstLoading = useMemo(() => {
    return farmsList.isLoading || (isEmpty && !farmsList.isFetched);
  }, [farmsList.isLoading, isEmpty, farmsList.isFetched]);

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
            {farmsList.data.data.map((farm, i) => (
              <TableRow key={farm.id}>
                <TableCell content={i + 1} />
                <TableCell content={farm.name} />
                <TableCell content={farm.place} />
                <TableCell content={farm.capacity} />
                <TableCell
                  content={
                    <EditIcon
                      className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => {
                        onEdit(farm.id);
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
                title="No farms found"
                description="Get started by creating a new farm"
              />
            }
          />
        </>
      }
    />
  );
};

export default FarmTable;
