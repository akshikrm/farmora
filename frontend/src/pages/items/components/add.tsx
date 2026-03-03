import { Dialog, DialogContent } from "@components/dialog";
import ItemForm from "./form";
import { useForm, type DefaultValues } from "react-hook-form";
import useAddEmployee from "../hooks/use-add-items";
import type { ItemFormValues } from "../types";

const defaultValues: DefaultValues<ItemFormValues> = {
  name: "",
  vendor_id: "",
  base_price: "",
  type: "regular",
};

type Props = {
  isShow: boolean;
  refetch: () => void;
  onClose: () => void;
};

const AddItem = ({ isShow, onClose, refetch }: Props) => {
  const methods = useForm<ItemFormValues>({
    defaultValues: defaultValues,
  });

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const { onSubmit } = useAddEmployee({
    onSuccess: () => {
      handleClose();
      refetch();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Add New Item" onClose={handleClose}>
      <DialogContent>
        <p className="text-gray-700">Add new Item</p>
        <ItemForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
};

export default AddItem;
