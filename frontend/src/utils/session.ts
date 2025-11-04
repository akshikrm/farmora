import type { UserSession } from "@app-types/auth.types";

const AUTH_TOKEN_KEY = "x-auth-token";

export const createSession = (session: UserSession) => {
  sessionStorage.setItem(AUTH_TOKEN_KEY, session.token || "");
};

export const getSession = (): UserSession => {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  return {
    token,
    name: null,
    username: null,
  };
};
