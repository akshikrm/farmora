import batches from "@api/vendor.api";
import type { VendorName } from "@app-types/vendor.types";
import useGetAll from "@hooks/use-get-all";

const usetGetVendorNames = () => {
  const query = useGetAll<VendorName[]>({
    queryFn: batches.getNames,
    queryKey: "batch:names",
  });

  return query;
};

export default usetGetVendorNames;
