import { Dialog, DialogContent } from "@components/dialog";
import FarmForm from "./farm-form";
import type { EditFarmRequest } from "@app-types/farms.types";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import farms from "@api/farms.api";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditFarmRequest = {
  id: 0,
  name: "",
  capacity: "0",
  place: "",
};

const EditFarm = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const query = useGetById<EditFarmRequest>(selectedId, {
    defaultValues,
    queryKey: "farm:get-by-id",
    queryFn: farms.fetchById,
  });

  const { methods, onSubmit } = useEditForm<EditFarmRequest>({
    defaultValues: query.data as EditFarmRequest,
    mutationKey: "farm:edit",
    mutationFn: farms.updateById,
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Farm" onClose={onClose}>
      <DialogContent>
        <p className="text-gray-700">Edit farm {query.data?.name}</p>
        <FarmForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditFarm;
