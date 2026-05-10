import type { WorkingCostListResponse } from "../types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import { useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import { roundNumber } from "@utils/number";

const headers = ["Date", "Purpose", "Amount"];

type Props = {
  data: WorkingCostListResponse;
};

const WorkingCostTable = ({ data }: Props) => {
  const { income, expense, totals } = data;
  console.log(income, expense, totals);

  const isEmpty = useMemo(() => {
    return expense.length === 0 && income.length === 0;
  }, [expense, income]);

  const renderTable = (
    items: {
      id: number;
      date: string;
      purpose: string;
      amount: number;
      payment_type: string;
      status: string;
    }[],
    title: string,
  ) => (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      <Card className="overflow-hidden">
        <Table>
          <TableRow>
            {headers.map((header) => (
              <TableHeaderCell key={header} content={header} />
            ))}
          </TableRow>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
              <TableCell content={item.purpose} />
              <TableCell content={item.amount || "-"} />
            </TableRow>
          ))}
        </Table>
        {items.length === 0 && (
          <DataNotFound
            title={`No ${title.toLowerCase()} records found`}
            description={`No ${title.toLowerCase()} items found`}
          />
        )}
      </Card>
    </div>
  );

  return (
    <>
      <Ternary
        when={totals}
        then={
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 mb-4">
            <Card className="p-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold capitalize text-muted-foreground">
                  Income
                </h3>

                <p className="text-3xl font-bold tracking-tight text-green-600">
                  ₹{totals?.income}
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold capitalize text-muted-foreground">
                  Expanse
                </h3>

                <p className="text-3xl font-bold tracking-tight text-red-600">
                  ₹{totals?.expanse}
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold capitalize text-muted-foreground">
                  Balance
                </h3>

                <p
                  className={`text-3xl font-bold tracking-tight ${totals?.balance > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  ₹{totals?.balance}
                </p>
              </div>
            </Card>
          </div>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {renderTable(expense, "Expense")}
        {renderTable(income, "Income")}
      </div>
      <Ternary
        when={isEmpty}
        then={
          <DataNotFound
            title="No working cost records found"
            description="Get started by adding a new entry"
          />
        }
      />
    </>
  );
};

const TotalItem = ({ label, value }: { label: string; value: number }) => {
  return (
    <h5 className="text-md font-semibold text-gray-800 mb-2">
      {label}: {roundNumber(value)}/-
    </h5>
  );
};

export default WorkingCostTable;
