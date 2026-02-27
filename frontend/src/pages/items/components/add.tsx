import { Dialog, DialogContent } from "@components/dialog";
import purchase from "@api/item.api";
import type { NewPurchaseRequest } from "@app-types/item.types";
import PurchaseForm from "./form";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import fetcherV2 from "@utils/fetcherV2";

const defaultValues: NewPurchaseRequest = {
  total_price: 0,
  net_amount: 0,
  invoice_number: "",
  invoice_date: dayjs().toISOString(),
  quantity: 0,
  vendor_id: null,
  season_id: null,
  discount_price: 0,
  price_per_unit: 0,
  category_id: null,
  batch_id: null,
  assign_quantity: 0,
  payment_type: "credit",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddPurchase = ({ isShow, onClose }: Props) => {
  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const methods = useForm({ defaultValues });

  const onSubmit = async (inputData: NewPurchaseRequest) => {
    const res = await purchase.create(inputData);
    if (res.status === "success") {
      handleClose();
      return;
    }
    if (res.status === "validation_error") {
      res.error.forEach((error) => {
        methods.setError(error.name, { message: error.message });
      });
    }
  };

  useEffect(() => {
    const getInvoiceNumber = async () => {
      const res = await fetcherV2("/api/invoice");
      console.log(res);
    };
    if (isShow) {
      getInvoiceNumber();
    }
  }, [isShow]);

  return (
    <Dialog
      isOpen={isShow}
      headerTitle="Add New Purchase"
      onClose={handleClose}
    >
      <DialogContent>
        <PurchaseForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPurchase;
