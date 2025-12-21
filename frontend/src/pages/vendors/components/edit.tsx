import { Dialog, DialogContent } from "@components/dialog";
import VendorForm from "./form";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import batches from "@api/vendor.api";
import type { EditVendorRequest } from "@app-types/vendor.types";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditVendorRequest = {
  id: 0,
  name: "",
  address: "",
  opening_balance: "",
  vendor_type: "",
};

const EditVendor = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const query = useGetById<EditVendorRequest>(selectedId, {
    defaultValues,
    queryKey: "vendor:get-by-id",
    queryFn: batches.fetchById,
  });

  const { methods, onSubmit } = useEditForm<EditVendorRequest>({
    defaultValues: query.data as EditVendorRequest,
    mutationKey: "vendor:edit",
    mutationFn: batches.updateById,
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Batch" onClose={handleClose}>
      <DialogContent>
        <VendorForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditVendor;
