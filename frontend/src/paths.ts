import type { Paths } from "./types/paths.types";

export const paths: Paths = [
  { pathname: "Dashboard", link: "/dashboard" },
  // { pathname: "Packages", link: "/packages" },
  // { pathname: "Subscriptions", link: "/subscriptions" },
  {
    pathname: "Expense",
    children: [
      { pathname: "Purchase", link: "/expense/purchase" },
      { pathname: "Returns", link: "/expense/returns" },
    ],
  },
  {
    pathname: "Configuration",
    children: [
      { pathname: "Items", link: "/configuration/items" },
      { pathname: "Farms", link: "/configuration/farms" },
      { pathname: "Seasons", link: "/configuration/seasons" },
      { pathname: "Batches", link: "/configuration/batches" },
      { pathname: "Vendors", link: "/configuration/vendors" },
      { pathname: "Employees", link: "/configuration/employees" },
    ],
  },
];
