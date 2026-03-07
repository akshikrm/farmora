import { Dialog, DialogContent } from "@components/dialog";
import purchase from "@api/item.api";
import type { NewPurchaseRequest } from "@app-types/item.types";
import PurchaseForm from "./form";
import dayjs from "dayjs";
import type { PurchaseFormValues } from "../types";
import useAddPurchase from "../hooks/use-add-purchase";

const defaultValues: PurchaseFormValues = {
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
  const { errors, clearError, onSubmit } = useAddPurchase({
    onSuccess: () => {
      handleClose();
    },
  });

  const handleClose = () => {
    onClose();
    clearError();
  };

  return (
    <Dialog
      isOpen={isShow}
      headerTitle="Add New Purchase"
      onClose={handleClose}
    >
      <DialogContent>
        <PurchaseForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          apiError={errors}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddPurchase;
