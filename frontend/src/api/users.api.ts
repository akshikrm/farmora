import fetcher from "@utils/fetcher";

const user = {
	fetchAll: () => fetcher("auth/users")
};

export default user;
