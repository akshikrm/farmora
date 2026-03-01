import { useEffect, useState } from "react";
import type { VendorFormValues } from "../types";
import vendors from "../api";

const useGetVendorById = (selectedId: number | null) => {
  const [dataLoaded, setdataLoaded] = useState(false);
  const [selectedData, setSelectedData] = useState<VendorFormValues>({
    address: "",
    name: "",
    opening_balance: "",
    vendor_type: "seller",
  });

  useEffect(() => {
    const handleGetEmployeeById = async (id: number) => {
      const res = await vendors.fetchById(id);
      if (res.status === "success") {
        if (res.data) {
          const { address, opening_balance, name, vendor_type } = res.data;
          setSelectedData({
            address,
            opening_balance,
            name,
            vendor_type,
          });
          setdataLoaded(true);
        }
      }
    };

    if (selectedId) {
      handleGetEmployeeById(selectedId);
    }
  }, [selectedId]);

  return { dataLoaded, selectedData };
};

export default useGetVendorById;
