import { Dialog, DialogContent } from "@components/dialog";
import type { NewItemRequest } from "@app-types/item-category.types";
import ItemCategoryForm from "./form";
import { useForm } from "react-hook-form";
import itemCategory from "@api/item-category.api";

const defaultValues: NewItemRequest = {
  name: "",
  vendor_id: "",
  type: "regular",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddItem = ({ isShow, onClose }: Props) => {
  const methods = useForm<NewItemRequest>({
    defaultValues: defaultValues,
  });

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const onSubmit = async (inputData: NewItemRequest) => {
    const res = await itemCategory.create(inputData);
    if (res.status === "success") {
      onClose();
      methods.reset(defaultValues);
      return;
    }
    if (res.status === "validation_error") {
      res.error.forEach((error) => {
        methods.setError(error.name, { message: error.message });
      });
      return;
    }
  };

  return (
    <Dialog isOpen={isShow} headerTitle="Add New Item" onClose={handleClose}>
      <DialogContent>
        <p className="text-gray-700">Add new Item</p>
        <ItemCategoryForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddItem;
