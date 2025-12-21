import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { paths } from "../paths";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { PathItem } from "../types/paths.types";
import UserProfile from "./user-profile";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleMenuClick = (pathname: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [pathname]: !prev[pathname],
    }));
  };

  // Auto-expand parent menu if child is active
  useEffect(() => {
    paths.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => child.link === location.pathname,
        );
        if (hasActiveChild) {
          setOpenMenus((prev) => ({ ...prev, [item.pathname]: true }));
        }
      }
    });
  }, [location.pathname]);

  const isActive = (link: string) => location.pathname === link;

  const renderMenuItem = (item: PathItem) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <div key={item.pathname}>
          <ListItemButton
            onClick={() => handleMenuClick(item.pathname)}
            className="!px-3 !py-2 !rounded-md hover:!bg-gray-100"
          >
            <ListItemText
              primary={item.pathname}
              primaryTypographyProps={{
                className: "!text-sm !text-gray-700",
              }}
            />
            {openMenus[item.pathname] ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </ListItemButton>
          <Collapse in={openMenus[item.pathname]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map((child) => {
                const active = isActive(child.link!);
                return (
                  <Link
                    key={child.link}
                    to={child.link!}
                    className="no-underline"
                  >
                    <ListItemButton
                      className={`!pl-8 !py-2 !rounded-md hover:!bg-gray-100 ${
                        active ? "!bg-green-50" : ""
                      }`}
                    >
                      <ListItemText
                        primary={child.pathname}
                        primaryTypographyProps={{
                          className: `!text-sm ${
                            active
                              ? "!text-green-700 !font-medium"
                              : "!text-gray-700"
                          }`,
                        }}
                      />
                    </ListItemButton>
                  </Link>
                );
              })}
            </List>
          </Collapse>
        </div>
      );
    }

    const active = isActive(item.link!);
    return (
      <Link key={item.link} to={item.link!} className="no-underline">
        <ListItemButton
          className={`!px-3 !py-2 !rounded-md hover:!bg-gray-100 ${
            active ? "!bg-green-50" : ""
          }`}
        >
          <ListItemText
            primary={item.pathname}
            primaryTypographyProps={{
              className: `!text-sm ${
                active ? "!text-green-700 !font-medium" : "!text-gray-700"
              }`,
            }}
          />
        </ListItemButton>
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full overflow-y-auto">
        <nav className="p-4">
          <div className="text-lg font-semibold text-gray-900 mb-6">
            Farmora
          </div>
          <List component="nav" disablePadding>
            <Link to="/" className="no-underline">
              <ListItemButton
                className={`!px-3 !py-2 !rounded-md hover:!bg-gray-100 ${
                  isActive("/") ? "!bg-green-50" : ""
                }`}
              >
                <ListItemText
                  primary="Dashboard"
                  primaryTypographyProps={{
                    className: `!text-sm ${
                      isActive("/")
                        ? "!text-green-700 !font-medium"
                        : "!text-gray-700"
                    }`,
                  }}
                />
              </ListItemButton>
            </Link>
            {paths.map((item) => renderMenuItem(item))}
          </List>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
          <div className="px-6 h-full flex items-center justify-end">
            <UserProfile />
          </div>
        </header>

        {/* Page content */}
        <main className="mt-16 flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
