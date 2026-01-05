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
      { pathname: "Purchase Book", link: "/expense/purchase-book" },
      { pathname: "Integration Book", link: "/expense/integration-book" },
      { pathname: "Working Coast", link: "/expense/working-coast" },
      { pathname: "Sales", link: "/expense/sales" },
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
