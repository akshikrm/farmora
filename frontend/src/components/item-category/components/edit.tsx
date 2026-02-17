import { Dialog, DialogContent } from "@components/dialog";
import ItemCategoryForm from "./form";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import itemCategories from "@api/item-category.api";
import type { EditItemRequest } from "@app-types/item-category.types";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditItemRequest = {
  id: 0,
  name: "",
  type: "",
};

const EditItemCategory = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const query = useGetById<EditItemRequest>(selectedId, {
    defaultValues,
    queryKey: "item-category:get-by-id",
    queryFn: itemCategories.fetchById,
  });

  const { methods, onSubmit } = useEditForm<EditItemRequest>({
    defaultValues: query.data as EditItemRequest,
    mutationKey: "item-category:edit",
    mutationFn: itemCategories.updateById,
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Item" onClose={handleClose}>
      <DialogContent>
        <ItemCategoryForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditItemCategory;
