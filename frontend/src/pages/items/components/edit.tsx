import { Dialog, DialogContent } from "@components/dialog";
import ItemForm from "./form";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import itemCategories from "@api/item.api";
import type { EditItemRequest } from "@app-types/item.types";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditItemRequest = {
  id: 0,
  name: "",
};

const EditItem = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const query = useGetById<EditItemRequest>(selectedId, {
    defaultValues,
    queryKey: "item:get-by-id",
    queryFn: itemCategories.fetchById,
  });

  const { methods, onSubmit } = useEditForm<EditItemRequest>({
    defaultValues: query.data as EditItemRequest,
    mutationKey: "item:edit",
    mutationFn: itemCategories.updateById,
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Item" onClose={handleClose}>
      <DialogContent>
        <p className="text-gray-700">Edit Item {query.data?.name}</p>
        <ItemForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditItem;
