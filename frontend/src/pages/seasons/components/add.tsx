import { Dialog, DialogContent } from "@components/dialog";
import FarmForm from "./form";
import useAddForm from "@hooks/use-add-form";
import seasons from "@api/seasons.api";
import type { NewSeason } from "@app-types/season.types";
import dayjs from "dayjs";

const defaultValues: NewSeason = {
  name: "",
  from_date: dayjs().toISOString(),
  to_date: dayjs().add(6, "months").toISOString(),
};

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddSeason = ({ isShow, onClose }: Props) => {
  const { methods, onSubmit } = useAddForm<NewSeason>({
    defaultValues,
    mutationFn: seasons.create,
    mutationKey: "season:add",
    onSuccess: () => {
      onClose();
    },
  });
  return (
    <Dialog isOpen={isShow} headerTitle="Add New Farm" onClose={onClose}>
      <DialogContent>
        <p className="text-gray-700">Add new Season</p>
        <FarmForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSeason;
