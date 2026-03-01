import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import { EditIcon } from "lucide-react";
import { useMemo } from "react";
import type { VendorsListResponse } from "../types";

const headers = [
  "ID",
  "Name",
  "Status",
  "Address",
  "Opening Balance",
  "Type",
  "Action",
];

type Props = {
  onEdit: (selectedId: number) => void;
  data: VendorsListResponse;
};

const VendorTable = (props: Props) => {
  const { onEdit, data } = props;

  const isEmpty = useMemo(() => {
    return data.data.length === 0;
  }, [data.data]);

  return (
    <>
      <Table>
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header} content={header} />
          ))}
        </TableRow>
        {data.data.map((vendor, i) => (
          <TableRow key={vendor.id}>
            <TableCell content={i + 1} />
            <TableCell content={vendor.name} />
            <TableCell content={vendor.status} />
            <TableCell content={vendor.address} />
            <TableCell content={vendor.opening_balance} />
            <TableCell content={vendor.vendor_type} />
            <TableCell
              content={
                <EditIcon
                  className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                  onClick={() => {
                    onEdit(vendor.id);
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
            title="No vendors found"
            description="Get started by creating a new vendor"
          />
        }
      />
    </>
  );
};

export default VendorTable;
