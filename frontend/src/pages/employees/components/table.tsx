import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import { EditIcon } from "lucide-react";
import { useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";
import type { EmployeesListResponse } from "@app-types/employees.types";

const headers = ["ID", "Name", "Username", "User Type", "Reset Flag", "Edit"];

type Props = {
  onEdit: (selectedId: number) => void;
  data: EmployeesListResponse;
};

const EmployeesTable = ({ onEdit, data }: Props) => {
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
        {data.data.map((employee, i) => (
          <TableRow key={employee.id}>
            <TableCell content={i + 1} />
            <TableCell content={employee.name} />
            <TableCell content={employee.username} />
            <TableCell content={employee.user_type} />
            <TableCell content={employee.reset_flag ? "Yes" : "No"} />
            <TableCell
              content={
                <EditIcon
                  className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                  onClick={() => {
                    onEdit(employee.id);
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
            title="No employees found"
            description="Get started by creating a new employee"
          />
        }
      />
    </>
  );
};

export default EmployeesTable;
