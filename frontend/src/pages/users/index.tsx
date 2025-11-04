import user from "@api/users.api";
import { useAuth } from "@store/authentication/context";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const UsersPage = () => {
  const userData = useAuth();
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => user.fetchAll(),
    enabled: false,
  });

  useEffect(() => {
    if (userData.token) {
      query.refetch();
    }
  }, [userData.token, query]);

  return <h1>Users Page</h1>;
};

export default UsersPage;
