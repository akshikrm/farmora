import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import item from "@api/item.api";
import type { NewPurchaseRequest } from "@app-types/item.types";
import PurchaseForm from "./form";
import dayjs from "dayjs";

const defaultValues: NewPurchaseRequest = {
  name: "",
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

  const { methods, onSubmit } = useAddForm<NewPurchaseRequest>({
    defaultValues,
    mutationFn: item.create,
    mutationKey: "item:add",
    onSuccess: () => {
      handleClose();
    },
  });

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
