import type { Paths } from "./types/paths.types";

export const paths: Paths = [
  { pathname: "Dashboard", link: "/dashboard" },
  { pathname: "Items", link: "/items" },
  { pathname: "Item Category", link: "/items/categories" },
  { pathname: "Item Returns", link: "/item-returns" },
  // { pathname: "Packages", link: "/packages" },
  // { pathname: "Subscriptions", link: "/subscriptions" },
  {
    pathname: "Configuration",
    children: [
      { pathname: "Farms", link: "/configuration/farms" },
      { pathname: "Seasons", link: "/configuration/seasons" },
      { pathname: "Batches", link: "/configuration/batches" },
      { pathname: "Vendors", link: "/configuration/vendors" },
      { pathname: "Employees", link: "/configuration/employees" },
    ],
  },
];
