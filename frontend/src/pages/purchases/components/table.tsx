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
  const [itemCategoryList, setItemCategoryList] = useState<
    ListResponse<Purchase>
  >({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
  });

  const isEmpty = useMemo(() => {
    return itemCategoryList.data.length === 0;
  }, [itemCategoryList.data]);

  return (
    <>
      <div className="mb-5">
        <FilterItems
          onFilter={async (filter) => {
            const res = await purchase.fetchAll(filter);
            if (res.status === "success") {
              if (res.data) {
                setItemCategoryList(res.data);
              }
            }
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
            {itemCategoryList.data.map((item) => (
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
