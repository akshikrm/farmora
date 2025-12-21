import useLogin from "@hooks/use-login";
import { ChevronDown } from "lucide-react";

const LoginPage = () => {
  const { onLogin, methods } = useLogin();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Hero Section - Left Side (70-80%) */}
      <div className="relative flex-1 w-full overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>

        {/* Logo */}
        <div className="absolute top-8 left-8 z-10 flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-green-600 font-bold text-xl">F</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Farmora</h1>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-12">
          <div className="max-w-2xl text-left">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Farm Management
              <br />
              Made Simple
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-xl">
              Streamline your farm operations with our comprehensive management
              system. Track inventory, manage seasons, and grow your business.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="text-white">
            <ChevronDown size={40} />
          </div>
        </div>
      </div>

      {/* Login Form - Right Side (20-30%) */}
      <div className="w-full max-w-md bg-white flex items-center justify-center px-8 py-12 shadow-2xl">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={methods.handleSubmit(onLogin)}>
            <div className="flex flex-col gap-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your username"
                  {...methods.register("username")}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                  {...methods.register("password")}
                  type="password"
                />
              </div>

              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Contact Sales
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
