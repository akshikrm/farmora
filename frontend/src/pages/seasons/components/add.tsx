import { Dialog, DialogContent } from "@components/dialog";
import FarmForm from "./form";
import useAddForm from "@hooks/use-add-form";
import seasons from "@api/seasons.api";
import type { NewSeasonRequest } from "@app-types/season.types";
import dayjs from "dayjs";

const defaultValues: NewSeasonRequest = {
  name: "",
  from_date: dayjs().toISOString(),
  to_date: dayjs().add(6, "months").toISOString(),
};

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddSeason = ({ isShow, onClose }: Props) => {
  const { methods, onSubmit } = useAddForm<NewSeasonRequest>({
    defaultValues,
    mutationFn: seasons.create,
    mutationKey: "season:add",
    onSuccess: () => {
      onClose();
    },
  });
  return (
    <Dialog isOpen={isShow} headerTitle="Add New Season" onClose={onClose}>
      <DialogContent>
        <FarmForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddSeason;
