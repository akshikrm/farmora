import type { BatchOverviewReturn } from "@app-types/batch-overview.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import dayjs from "dayjs";

const returnHeaders = ["Date", "Purpose", "Quantity", "Price", "Amount"];

type Props = {
  returns: BatchOverviewReturn[];
  returnTotals: {
    quantity: number;
    amount: number;
  } | null;
};

const ReturnItem = (props: Props) => {
  const { returns, returnTotals } = props;
  return (
    <>
      <h3 className="text-lg font-semibold mb-3">Returned Items</h3>
      <Table>
        <TableRow>
          {returnHeaders.map((header) => (
            <TableHeaderCell key={header} content={header} />
          ))}
        </TableRow>
        {returns.map((item, index) => (
          <TableRow key={index}>
            <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
            <TableCell content={item.purpose} />
            <TableCell content={item.quantity} />
            <TableCell content={`$${item.price.toFixed(2)}`} />
            <TableCell content={`$${item.amount.toFixed(2)}`} />
          </TableRow>
        ))}
        {returnTotals && returns && returns.length > 0 && (
          <TableRow>
            <TableCell content={<strong>Total</strong>} />
            <TableCell content="" />
            <TableCell content={<strong>{returnTotals.quantity}</strong>} />
            <TableCell content="" />
            <TableCell
              content={<strong>${returnTotals.amount.toFixed(2)}</strong>}
            />
          </TableRow>
        )}
      </Table>
      {returns && returns.length === 0 && (
        <div className="bg-gray-50 p-6 text-center text-gray-500">
          No returned items found
        </div>
      )}
    </>
  );
};

export default ReturnItem;
