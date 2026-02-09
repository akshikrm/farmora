import { Box } from "@mui/material";
import type { ReactNode } from "react";

const FilterWrapper = ({ children }: { children: ReactNode }) => {
  return <Box className="w-full p-6 mb-6">{children}</Box>;
};

export default FilterWrapper;
