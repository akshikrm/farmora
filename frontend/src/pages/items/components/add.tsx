import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import item from "@api/item.api";
import type { NewItemRequest } from "@app-types/item.types";
import ItemForm from "./form";
import dayjs from "dayjs";

const defaultValues: NewItemRequest = {
  name: "",
  total_price: 0,
  net_amount: 0,
  invoice_number: "",
  invoice_date: dayjs().toISOString(),
  quantity: 0,
  vendor_id: 0,
  discount_price: 0,
  price_per_unit: 0,
  category_id: 0,
  batch_id: 0,
  assign_quantity: 0,
};
type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddItem = ({ isShow, onClose }: Props) => {
  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const { methods, onSubmit } = useAddForm<NewItemRequest>({
    defaultValues,
    mutationFn: item.create,
    mutationKey: "item:add",
    onSuccess: () => {
      handleClose();
    },
  });
  return (
    <Dialog isOpen={isShow} headerTitle="Add New Purchase" onClose={handleClose}>
      <DialogContent>
        <ItemForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddItem;
