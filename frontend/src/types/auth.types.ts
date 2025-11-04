import { type ActionDispatch } from "react";

export type LoginPayload = {
  username: string;
  password: string;
};

export type AuthContextData = {
  token: string | null;
};

export type AuthDispatchContextData = ActionDispatch<[action: AuthActions]>;

export type AuthActions = {
  type: "LOGIN" | "LOGOUT";
  payload: string | null;
};

export type UserSession = {
  username: string | null;
  name: string | null;
  token: string | null;
};
