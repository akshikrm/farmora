import { useAuth } from "@store/authentication/context";
import { useQuery } from "@tanstack/react-query";
import vendors from "../api";
import type { VendorName, VendorType } from "../types";

type UseGetVendorNamesOpts = {
  vendorType?: VendorType;
  enabled?: boolean;
};

const useGetVendorNames = (opts: UseGetVendorNamesOpts = {}) => {
  const { vendorType, enabled = true } = opts;
  const { token } = useAuth();

  return useQuery<VendorName[]>({
    queryKey: ["vendors", "names", vendorType ?? "all"],
    queryFn: async () => {
      const res = await vendors.fetchNames();
      if (res.status === "success") {
        const names = res.data ?? [];
        if (!vendorType) return names;
        return names.filter((item) => item.vendor_type === vendorType);
      }
      return [];
    },
    enabled: Boolean(token) && enabled,
    initialData: [],
  });
};

export default useGetVendorNames;
