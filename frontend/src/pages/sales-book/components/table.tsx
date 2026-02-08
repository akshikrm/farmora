import salesBook from "@api/sales-book.api";
import type {
  SalesBookFilterRequest,
  SalesBookLedger,
  SalesBookTransaction,
} from "@app-types/sales-book.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import FilterSalesBook from "./filter";
import { useState } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import serializeFilter from "@utils/serialie-filter";

type LoadingStatus = "idle" | "loading" | "success" | "failed" | "empty";
type Totals = {
  birds: number;
  weight: number;
  amount: number;
};

const headers = [
  "Date",
  "Birds",
  "Weight (kg)",
  "Price",
  "Amount",
  "Type",
  "Balance",
];

const calculateTotals = (transactions: SalesBookTransaction[]) => {
  const totals = transactions.reduce(
    (acc, item) => ({
      birds: acc.birds + (item.bird_no || 0),
      weight:
        acc.weight + (item.weight ? parseFloat(item.weight.toString()) : 0),
      amount: acc.amount + parseFloat(item.amount.toString()),
    }),
    { birds: 0, weight: 0, amount: 0 },
  );

  return totals;
};
const SalesBookTable = () => {
  const [totals, setTotals] = useState<Totals>({
    amount: 0,
    birds: 0,
    weight: 0,
  });
  const [ledger, setLedger] = useState<SalesBookLedger>({
    buyer: "",
    closing_balance: "",
    opening_balance: "",
    transactions: [],
  });
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("idle");

  const handleFilter = async (filter: SalesBookFilterRequest) => {
    setLoadingStatus("loading");
    const res = await salesBook.fetchLedger(serializeFilter(filter));

    if (res.status !== "success" || !res.data) {
      setLoadingStatus("failed");
      return;
    }

    const { transactions, buyer, closing_balance, opening_balance } = res.data;
    if (transactions.length === 0) {
      setLoadingStatus("empty");
      return;
    }
    setLedger({
      buyer,
      closing_balance,
      opening_balance,
      transactions,
    });
    setTotals(calculateTotals(transactions));
    setLoadingStatus("success");
  };

  return (
    <>
      <FilterSalesBook onFilter={handleFilter} />

      {loadingStatus === "success" ? (
        <Card className="p-10 mb-3 flex justify-between">
          <Box>
            <Typography>Buyer</Typography>
            <Typography variant="h6">{ledger.buyer}</Typography>
          </Box>
          <Box>
            <Typography>Opening Balance</Typography>
            <Typography variant="h6">${ledger.opening_balance}</Typography>
          </Box>
          <Box>
            <Typography>Closing Balance</Typography>
            <Typography variant="h6">${ledger.closing_balance}</Typography>
          </Box>
        </Card>
      ) : null}

      <Card>
        <Table>
          <TableRow>
            {headers.map((header) => (
              <TableHeaderCell key={header} content={header} />
            ))}
          </TableRow>

          {loadingStatus === "success" ? (
            <>
              <DataTable transactions={ledger.transactions} />
              <Totals totals={totals} />
            </>
          ) : null}
        </Table>
        {loadingStatus === "empty" ? (
          <DataNotFound
            title="Sales Entry not Found"
            description="Current filter do not have any entry, change filter"
          />
        ) : null}

        {loadingStatus === "idle" ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg">
              Please select a buyer and click "Apply Filters" to view sales
              ledger
            </p>
          </div>
        ) : null}

        {loadingStatus === "loading" ? <DataLoading /> : null}
      </Card>
    </>
  );
};

const DataTable = ({
  transactions,
}: {
  transactions: SalesBookTransaction[];
}) => {
  return transactions.map((item, index) => (
    <TableRow key={index}>
      <TableCell content={dayjs(item.created_date).format("DD-MM-YYYY")} />
      <TableCell content={item.bird_no ?? "-"} />
      <TableCell content={item.weight ? item.weight.toFixed(2) : "-"} />
      <TableCell content={item.price ? `$${item.price.toFixed(2)}` : "-"} />
      <TableCell content={`$${item.amount.toFixed(2)}`} />
      <TableCell
        content={
          <span
            className={`px-2 py-1 rounded text-xs ${
              item.type === "cash"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {item.type.toUpperCase()}
          </span>
        }
      />
      <TableCell
        content={
          <span className="font-semibold">${item.balance.toFixed(2)}</span>
        }
      />
    </TableRow>
  ));
};

const Totals = ({ totals }: { totals: Totals }) => {
  return (
    <TableRow>
      <TableCell content={<strong>Total</strong>} />
      <TableCell content={<strong>{totals.birds}</strong>} />
      <TableCell content={<strong>{totals.weight.toFixed(2)}</strong>} />
      <TableCell content="" />
      <TableCell content={<strong>${totals.amount.toFixed(2)}</strong>} />
      <TableCell content="" />
      <TableCell content="" />
    </TableRow>
  );
};

export default SalesBookTable;
