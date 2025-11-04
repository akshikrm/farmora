import user from "@api/users.api";
import { useAuth } from "@store/authentication/context";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type ListResponse<T> = {
  data: T[];
  limit: number;
  page: number;
  total: number;
};

type User = {
  id: number;
  name: string;
  username: string;
  parent_id: number;
  reset_flag: boolean;
  user_type: string;
};

type UsersListResponse = ListResponse<User>;

const UsersPage = () => {
  const userData = useAuth();
  const query = useQuery<UsersListResponse>({
    queryKey: ["users"],
    queryFn: async () => {
      const res: UsersListResponse = await user.fetchAll();

      return res;
    },
    enabled: false,
  });

  console.log(query.data?.data, query.data?.total);

  useEffect(() => {
    if (userData.token) {
      query.refetch();
    }
  }, [userData.token, query]);

  return <h1>Users Page</h1>;
};

export default UsersPage;
