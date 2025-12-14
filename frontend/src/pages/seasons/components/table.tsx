import seasons from "@api/seasons.api";
import type { Season } from "@app-types/season.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import useGetAll from "@hooks/use-get-all";
import dayjs from "dayjs";
import { EditIcon } from "lucide-react";

const headers = ["ID", "Name", "Status", "From Date", "End Date", "Action"];

type Props = {
  onEdit: (selectedId: number) => void;
};

const SeasonTable = ({ onEdit }: Props) => {
  const seasonList = useGetAll<Season>({
    queryFn: seasons.fetchAll,
    queryKey: "season:all",
  });

  return (
    <Table>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell key={header} content={header} />
        ))}
      </TableRow>
      {seasonList.data.data.map((season, i) => (
        <TableRow key={season.id}>
          <TableCell content={i + 1} />
          <TableCell content={season.name} />
          <TableCell content={season.status} />
          <TableCell content={dayjs(season.from_date).format("DD-MM-YYYY")} />
          <TableCell content={dayjs(season.to_date).format("DD-MM-YYYY")} />
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

export default SeasonTable;
