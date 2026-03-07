import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import { EditIcon } from "lucide-react";
import FilterItems from "./filter";
import { useMemo, useState } from "react";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import type { ListResponse } from "@app-types/response.types";
import type { Purchase } from "../types";
import purchase from "../api";
import useGetPurchases from "../hooks/use-get-purchases";

const headers = [
  "Invoice Number",
  "Invoice Date",
  "Supplier Name",
  "Total Amount",
  "Total Discount",
  "Net Amount",
  "Action",
];

type Props = {
  onEdit: (selectedId: number) => void;
};

const ItemTable = ({ onEdit }: Props) => {
  const { handleFetchAllPurchases, purchaseList } = useGetPurchases();

  const isEmpty = useMemo(() => {
    return purchaseList.data.length === 0;
  }, [purchaseList.data]);

  return (
    <>
      <div className="mb-5">
        <FilterItems
          onFilter={async (filter) => {
            await handleFetchAllPurchases(filter);
          }}
        />
      </div>

      <>
        <Card>
          <Table>
            <TableRow>
              {headers.map((header) => (
                <TableHeaderCell key={header} content={header} />
              ))}
            </TableRow>
            {purchaseList.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell content={item.invoice_number} />
                <TableCell
                  content={dayjs(item.invoice_date).format("DD-MM-YYYY")}
                />
                <TableCell content={item.vendor.name} />
                <TableCell content={item.total_price} />
                <TableCell content={item.discount_price} />
                <TableCell content={item.net_amount || "-"} />
                <TableCell
                  content={
                    <EditIcon
                      className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => {
                        onEdit(item.id);
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
                title="No purchases found"
                description="Try adjusting your filters or create a new purchase"
              />
            }
          />
        </Card>
      </>
    </>
  );
};

export default ItemTable;
