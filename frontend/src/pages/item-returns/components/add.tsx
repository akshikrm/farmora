import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import itemReturn from "@api/item-return.api";
import type { NewItemReturnRequest } from "@app-types/item-return.types";
import ItemReturnForm from "./form";
import dayjs from "dayjs";

const defaultValues: NewItemReturnRequest = {
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

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddItemReturn = ({ isShow, onClose }: Props) => {
  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const { methods, onSubmit } = useAddForm<NewItemReturnRequest>({
    defaultValues,
    mutationFn: itemReturn.create,
    mutationKey: "item-return:add",
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Add New Return" onClose={handleClose}>
      <DialogContent>
        <p className="text-gray-700">Create a new item return</p>
        <ItemReturnForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddItemReturn;
