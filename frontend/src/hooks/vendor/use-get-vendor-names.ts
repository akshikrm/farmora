import batches from "@api/vendor.api";
import type { VendorName } from "@app-types/vendor.types";
import useGetNames from "@hooks/use-get-names";

const usetGetVendorNames = () => {
  const query = useGetNames<VendorName[]>({
    queryFn: batches.getNames,
    queryKey: "vendor:names",
  });

  return query;
};

export default usetGetVendorNames;
