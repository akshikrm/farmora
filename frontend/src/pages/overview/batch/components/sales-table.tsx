import type { BatchOverviewSale } from "@app-types/batch-overview.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import dayjs from "dayjs";

const salesHeaders = [
  "Date",
  "Vehicle No",
  "Weight",
  "Birds",
  "Avg Weight",
  "Price",
  "Amount",
];

type Props = {
  sales: BatchOverviewSale[];
  salesTotals: {
    weight: number;
    birds: number;
    amount: number;
  } | null;
};

const SalesTable = (props: Props) => {
  const { sales, salesTotals } = props;
  return (
    <>
      <h2 className="text-xl font-semibold mb-3">Sales</h2>
      <Table>
        <TableRow>
          {salesHeaders.map((header) => (
            <TableHeaderCell key={header} content={header} />
          ))}
        </TableRow>
        {sales.map((item, index) => (
          <TableRow key={index}>
            <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
            <TableCell content={item.vehicle_no} />
            <TableCell content={item.weight ? item.weight.toFixed(2) : "-"} />
            <TableCell content={item.bird_no ?? "-"} />
            <TableCell
              content={item.avg_weight ? item.avg_weight.toFixed(2) : "-"}
            />
            <TableCell
              content={item.price ? `$${item.price.toFixed(2)}` : "-"}
            />
            <TableCell content={`$${item.amount.toFixed(2)}`} />
          </TableRow>
        ))}
        {salesTotals && sales && sales.length > 0 && (
          <TableRow>
            <TableCell content={<strong>Total</strong>} />
            <TableCell content="" />
            <TableCell
              content={<strong>{salesTotals.weight.toFixed(2)}</strong>}
            />
            <TableCell content={<strong>{salesTotals.birds}</strong>} />
            <TableCell content="" />
            <TableCell content="" />
            <TableCell
              content={<strong>${salesTotals.amount.toFixed(2)}</strong>}
            />
          </TableRow>
        )}
      </Table>
      {sales && sales.length === 0 && (
        <div className="bg-gray-50 p-6 text-center text-gray-500">
          No sales found
        </div>
      )}
    </>
  );
};

export default SalesTable;
