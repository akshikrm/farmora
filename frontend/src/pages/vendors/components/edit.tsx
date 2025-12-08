import { Dialog, DialogContent } from "@components/dialog";
import BatchForm from "./form";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import batches from "@api/vendor.api";
import type { EditBatchRequest } from "@app-types/vendor.types";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditBatchRequest = {
  id: 0,
  name: "",
  status: "active",
};

const EditBatch = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const query = useGetById<EditBatchRequest>(selectedId, {
    defaultValues,
    queryKey: "vendor:get-by-id",
    queryFn: batches.fetchById,
  });

  const { methods, onSubmit } = useEditForm<EditBatchRequest>({
    defaultValues: query.data as EditBatchRequest,
    mutationKey: "vendor:edit",
    mutationFn: batches.updateById,
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Batch" onClose={handleClose}>
      <DialogContent>
        <p className="text-gray-700">Edit Batch {query.data?.name}</p>
        <BatchForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditBatch;
