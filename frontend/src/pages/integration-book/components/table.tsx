import type { IntegrationBookListResponse } from "../types";
import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import DataNotFound from "@components/data-not-found";
import dayjs from "dayjs";
import Card from "@mui/material/Card";

const headers = ["Date", "Purpose", "Amount"];

type Props = {
  data: IntegrationBookListResponse;
};

const IntegrationBookTable = ({ data }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Paid</h2>
          <Card className="overflow-hidden">
            <Table>
              <TableRow>
                {headers.map((header) => (
                  <TableHeaderCell key={header} content={header} />
                ))}
              </TableRow>
              {data.paid?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
                  <TableCell content={item.name} />
                  <TableCell content={item.net_amount || "-"} />
                </TableRow>
              ))}
            </Table>
            {data.credit?.length === 0 && (
              <DataNotFound
                title={`No credit records found`}
                description={`No credit items found`}
              />
            )}
          </Card>
        </div>

        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Credit</h2>
          <Card className="overflow-hidden">
            <Table>
              <TableRow>
                {headers.map((header) => (
                  <TableHeaderCell key={header} content={header} />
                ))}
              </TableRow>
              {data.credit?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell content={dayjs(item.date).format("DD-MM-YYYY")} />
                  <TableCell content={item.name} />
                  <TableCell content={item.net_amount || "-"} />
                </TableRow>
              ))}
            </Table>
            {data.credit?.length === 0 && (
              <DataNotFound
                title={`No credit records found`}
                description={`No credit items found`}
              />
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default IntegrationBookTable;
