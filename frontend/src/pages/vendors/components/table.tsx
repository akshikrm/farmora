import vendors from "@api/vendor.api";
import type { Vendor } from "@app-types/vendor.types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import useGetAll from "@hooks/use-get-all";
import { EditIcon } from "lucide-react";

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
};

const VendorTable = ({ onEdit }: Props) => {
  const vendorList = useGetAll<Vendor>({
    queryFn: vendors.fetchAll,
    queryKey: "vendor:all",
  });

  return (
    <Table>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell key={header} content={header} />
        ))}
      </TableRow>
      {vendorList.data.data.map((vendor, i) => (
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
  );
};

export default VendorTable;
