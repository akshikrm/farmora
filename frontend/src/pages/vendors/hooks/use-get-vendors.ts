import vendors from "../api";
import type { VendorsListResponse } from "../types";
import { useEffect, useState } from "react";

const useGetVendors = () => {
  const [vendorList, setVendorList] = useState<VendorsListResponse>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
  });

  const handleFetchAllVendors = async () => {
    const res = await vendors.fetchAll();
    if (res.status === "success") {
      if (res.data) {
        setVendorList(res.data);
      }
    }
  };
  useEffect(() => {
    handleFetchAllVendors();
  }, []);

  return { vendorList, handleFetchAllVendors };
};

export default useGetVendors;
