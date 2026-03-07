import ItemPage from "./page";
import api from "./api";

export { api as itemsApi };

export const itemTypes = [
  { label: "Regular", value: "regular" },
  { label: "Chick", value: "chick" },
  { label: "Medicine", value: "medicine" },
  { label: "BF", value: "BF" },
  { label: "BS", value: "BS" },
  { label: "PBS", value: "PBS" },
  { label: "Integration", value: "integration" },
  { label: "Working", value: "working" },
];

export default ItemPage;
