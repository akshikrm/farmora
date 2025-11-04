import useLogin from "@hooks/use-login";

const LoginPage = () => {
  const { onLogin, methods } = useLogin();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="shadow-md p-8 bg-white rounded min-w-[500px]">
        <h1 className="text-2xl text-center">Login</h1>
        <form onSubmit={methods.handleSubmit(onLogin)}>
          <div className="flex flex-col gap-4 mt-4">
            <input
              className="input"
              placeholder="username"
              {...methods.register("username")}
            />
            <input
              className="input"
              placeholder="password"
              {...methods.register("password")}
              type="password"
            />
            <button className="w-full cursor-pointer" type="submit">
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
