import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import vendors from "@api/vendor.api";
import type { NewVendorRequest } from "@app-types/vendor.types";
import BatchForm from "./form";

const defaultValues: NewVendorRequest = {
  name: "",
  address: "",
  opening_balance: "",
  vendor_type: "seller",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddVendor = ({ isShow, onClose }: Props) => {
  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const { methods, onSubmit } = useAddForm<NewVendorRequest>({
    defaultValues,
    mutationFn: vendors.create,
    mutationKey: "vendor:add",
    onSuccess: () => {
      handleClose();
    },
  });
  return (
    <Dialog isOpen={isShow} headerTitle="Add New Vendor" onClose={handleClose}>
      <DialogContent>
        <p className="text-gray-700">Add new Vendor</p>
        <BatchForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddVendor;
