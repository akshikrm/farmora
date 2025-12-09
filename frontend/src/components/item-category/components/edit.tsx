import { Dialog, DialogContent } from "@components/dialog";
import ItemCategoryForm from "./form";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import itemCategories from "@api/item-category.api";
import type { EditItemCategoryRequest } from "@app-types/item-category.types";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditItemCategoryRequest = {
  id: 0,
  name: "",
};

const EditItemCategory = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const query = useGetById<EditItemCategoryRequest>(selectedId, {
    defaultValues,
    queryKey: "item-category:get-by-id",
    queryFn: itemCategories.fetchById,
  });

  const { methods, onSubmit } = useEditForm<EditItemCategoryRequest>({
    defaultValues: query.data as EditItemCategoryRequest,
    mutationKey: "item-category:edit",
    mutationFn: itemCategories.updateById,
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Batch" onClose={handleClose}>
      <DialogContent>
        <p className="text-gray-700">Edit Batch {query.data?.name}</p>
        <ItemCategoryForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditItemCategory;
