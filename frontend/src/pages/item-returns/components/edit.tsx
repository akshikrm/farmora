import { Dialog, DialogContent } from "@components/dialog";
import useGetById from "@hooks/use-get-by-id";
import useEditForm from "@hooks/use-edit-form";
import itemReturn from "@api/item-return.api";
import type { EditItemReturnRequest } from "@app-types/item-return.types";
import ItemReturnForm from "./form";
import dayjs from "dayjs";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditItemReturnRequest = {
  id: 0,
  return_type: "vendor",
  item_category_id: 0,
  date: dayjs().toISOString(),
  from_batch: 0,
  to_batch: null,
  to_vendor: null,
  quantity: 0,
  rate_per_bag: 0,
  total_amount: 0,
  status: "completed",
};

const EditItemReturn = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const query = useGetById(selectedId, {
    queryKey: "item-return:get-by-id",
    queryFn: itemReturn.fetchById,
    defaultValues,
  });

  const { methods, onSubmit } = useEditForm<EditItemReturnRequest>({
    defaultValues: query.data as EditItemReturnRequest,
    mutationKey: "item-return:edit",
    mutationFn: itemReturn.updateById,
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Return" onClose={onClose}>
      <DialogContent>
        <ItemReturnForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditItemReturn;
