import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import batches from "@api/batches.api";
import type { NewBatchRequest } from "@app-types/batch.types";
import BatchForm from "./form";

const defaultValues: NewBatchRequest = {
  name: "",
  farm_id: null,
  season_id: null,
  status: "active",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddBatch = ({ isShow, onClose }: Props) => {
  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const { methods, onSubmit } = useAddForm<NewBatchRequest>({
    defaultValues,
    mutationFn: batches.create,
    mutationKey: "batch:add",
    onSuccess: () => {
      handleClose();
    },
  });
  return (
    <Dialog isOpen={isShow} headerTitle="Add New Batch" onClose={handleClose}>
      <DialogContent>
        <p className="text-gray-700">Add new Batch</p>
        <BatchForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddBatch;
