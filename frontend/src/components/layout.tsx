import type { ReactNode } from "react";
import { Link } from "react-router";
import { paths } from "../paths";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
        <nav className="p-4 space-y-2">
          <div className="text-lg font-semibold text-gray-900 mb-6">
            Farmora
          </div>
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            Dashboard
          </Link>
          {paths.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              {item.pathname}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
          <div className="px-6 h-full flex items-center justify-between">
            {/* Header content will go here */}
          </div>
        </header>

        {/* Page content */}
        <main className="mt-16 flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
