import vendors from "@api/vendor.api";
import type { VendorName } from "@app-types/vendor.types";
import { useState, useEffect } from "react";

const useGetSellerNameList = () => {
  const [state, setState] = useState<VendorName[]>([]);

  useEffect(() => {
    vendors
      .getNames()
      .then((data: VendorName[]) => {
        setState(data.filter(({ vendor_type }) => vendor_type === "seller"));
      })
      .catch((err) => {
        console.log(err);
        setState([]);
      });
  }, []);

  return { data: state };
};

export default useGetSellerNameList;
