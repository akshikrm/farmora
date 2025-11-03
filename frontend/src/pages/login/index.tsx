import { useState } from "react";
import type { LoginPayload } from "@app-types/auth.types";
import useLogin from "@hooks/use-login";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [loginData, setLoginData] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { onLogin } = useLogin();

  const form = useForm<LoginPayload>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="shadow-md p-8 bg-white rounded min-w-[500px]">
        <h1 className="text-2xl text-center">Login</h1>
        <div className="flex flex-col gap-4 mt-4">
          <input
            className="input"
            placeholder="username"
            value={loginData.username}
            name="username"
            onChange={onChange}
          />
          <input
            className="input"
            placeholder="password"
            value={loginData.password}
            name="password"
            type="password"
            onChange={onChange}
          />
          <button className="w-full" onClick={() => onLogin(loginData)}>
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
