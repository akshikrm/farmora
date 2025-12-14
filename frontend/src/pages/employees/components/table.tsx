import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import useGetEmployees from "@hooks/employees/use-get-employees";
import { EditIcon } from "lucide-react";
import { useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";

const headers = ["ID", "Name", "Username", "User Type", "Reset Flag", "Edit"];

type Props = {
  onEdit: (selectedId: number) => void;
};

const EmployeesTable = ({ onEdit }: Props) => {
  const employeesList = useGetEmployees();

  const isEmpty = useMemo(() => {
    return employeesList.data?.data.length === 0;
  }, [employeesList.data]);

  const isFirstLoading = useMemo(() => {
    return employeesList.isLoading || (isEmpty && !employeesList.isFetched);
  }, [employeesList.isLoading, isEmpty, employeesList.isFetched]);

  return (
    <Ternary
      when={isFirstLoading}
      then={<DataLoading />}
      otherwise={
        <>
          <Table>
            <TableRow>
              {headers.map((header) => (
                <TableHeaderCell key={header} content={header} />
              ))}
            </TableRow>
            {employeesList.data.data.map((employee, i) => (
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
      }
    />
  );
};

export default EmployeesTable;
