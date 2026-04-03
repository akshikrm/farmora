import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import dayjs from "dayjs";
import { roundNumber } from "@utils/number";
import type { BatchOverviewItem } from "../types";

const batchHeaders = [
  "Batch Name",
  "Close Date",
  "Avg Weight",
  "FCR",
  "CFSR",
  "Avg Cost",
  "Avg Rate",
  "Profit/Loss %",
  "Profit",
];

type BatchOverviewTableProps = {
  batches: BatchOverviewItem[];
};

const BatchOverviewTable = (props: BatchOverviewTableProps) => {
  const { batches } = props;
  return (
    <>
      <h2 className="text-xl font-semibold mb-3">Batch Overview</h2>
      <Table>
        <TableRow>
          {batchHeaders.map((header) => (
            <TableHeaderCell key={header} content={header} />
          ))}
        </TableRow>
        {batches.map((item) => {
          const {
            avg_weight,
            fcr,
            cfcr,
            total_expense,
            total_sale_amount,
            total_sale_weight,
          } = item.overviewCalculations;

          const avgCost = total_expense / total_sale_weight;

          const avgRate = total_sale_amount / total_sale_weight;
          return (
            <TableRow key={item.batch_id}>
              <TableCell content={item.batch.name} />
              <TableCell
                content={
                  item.batch.closed_on
                    ? dayjs(item.batch.closed_on).format("DD-MM-YYYY")
                    : "-"
                }
              />

              <TableCell content={roundNumber(avg_weight)} />
              <TableCell content={roundNumber(fcr)} />
              <TableCell content={roundNumber(cfcr)} />
              <TableCell content={roundNumber(avgCost)} />
              <TableCell content={roundNumber(avgRate)} />
              <TableCell content={roundNumber(avgRate - avgCost)} />
              <TableCell
                content={roundNumber(total_sale_amount - total_expense)}
              />
            </TableRow>
          );
        })}
      </Table>
    </>
  );
};

export default BatchOverviewTable;
