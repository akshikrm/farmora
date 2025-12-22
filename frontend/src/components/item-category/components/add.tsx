import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import itemCategory from "@api/item-category.api";
import type { NewItemCategoryRequest } from "@app-types/item-category.types";
import ItemCategoryForm from "./form";

const defaultValues: NewItemCategoryRequest = {
  name: "",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddItemCategory = ({ isShow, onClose }: Props) => {
  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const { methods, onSubmit } = useAddForm<NewItemCategoryRequest>({
    defaultValues,
    mutationFn: itemCategory.create,
    mutationKey: "item-category",
    onSuccess: () => {
      handleClose();
    },
  });
  return (
    <Dialog
      isOpen={isShow}
      headerTitle="Add New Item"
      onClose={handleClose}
    >
      <DialogContent>
        <p className="text-gray-700">Add new Item</p>
        <ItemCategoryForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddItemCategory;
