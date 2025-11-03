import type { LoginPayload } from "@app-types/auth.types";
import fetcher from "@utils/fetcher";

const auth = {
  login: (payload: LoginPayload) =>
    fetcher("auth/login", JSON.stringify(payload)),
};

export default auth;
