import { Dialog, DialogContent } from "@components/dialog";
import FarmForm from "./farm-form";
import type { NewFarmRequest } from "@app-types/farms.types";
import farms from "@api/farms.api";
import useAddForm from "@hooks/use-add-form";

const defaultValues: NewFarmRequest = {
  name: "",
  capacity: "0",
  place: "",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddFarm = ({ isShow, onClose }: Props) => {
  const { methods, onSubmit } = useAddForm<NewFarmRequest>({
    defaultValues,
    mutationFn: farms.create,
    mutationKey: "farm:add",
    onSuccess: () => {
      onClose();
    },
  });
  return (
    <Dialog isOpen={isShow} headerTitle="Add New Farm" onClose={onClose}>
      <DialogContent>
        <p className="text-gray-700">Add a new user to the system.</p>
        <FarmForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddFarm;
