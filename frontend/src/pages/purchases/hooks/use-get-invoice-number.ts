import fetcherV2, { type FetcherReturnType } from "@utils/fetcherV2";
import { useState } from "react";

const useGetInvoiceNumber = () => {
  const [invoiceId, setInvoiceId] = useState("");

  const getInvoiceNumber = async () => {
    const res = await fetcherV2<FetcherReturnType<string>>("invoice");
    if (res.status === "success") {
      if (res.data) {
        setInvoiceId(res.data);
      }
    }
  };
  getInvoiceNumber();
};

export default useGetInvoiceNumber;
