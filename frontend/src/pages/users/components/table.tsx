import Table from "@components/Table";
import TableCell from "@components/TableCell";
import TableHeaderCell from "@components/TableHeaderCell";
import TableRow from "@components/TableRow";
import useGetUsers from "@hooks/users/use-get-users";
import { EditIcon } from "lucide-react";
import { useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import DataLoading from "@components/data-loading";
import Ternary from "@components/ternary";

const headers = ["ID", "Name", "Username", "User Type", "Reset Flag", "Edit"];

type Props = {
  onEdit: (selectedId: number) => void;
};

const UsersTable = ({ onEdit }: Props) => {
  const usersList = useGetUsers();

  const isEmpty = useMemo(() => {
    return usersList.data?.data.length === 0;
  }, [usersList.data]);

  const isFirstLoading = useMemo(() => {
    return usersList.isLoading || (isEmpty && !usersList.isFetched);
  }, [usersList.isLoading, isEmpty, usersList.isFetched]);

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
            {usersList.data.data.map((user, i) => (
              <TableRow key={user.id}>
                <TableCell content={i + 1} />
                <TableCell content={user.name} />
                <TableCell content={user.username} />
                <TableCell content={user.user_type} />
                <TableCell content={user.reset_flag ? "Yes" : "No"} />
                <TableCell
                  content={
                    <EditIcon
                      className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() => {
                        onEdit(user.id);
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
                title="No users found"
                description="Get started by creating a new user"
              />
            }
          />
        </>
      }
    />
  );
};

export default UsersTable;
