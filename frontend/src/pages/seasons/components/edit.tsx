import { Dialog, DialogContent } from "@components/dialog";
import SeasonForm from "./form";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import seasons from "@api/seasons.api";
import type { EditSeasonRequest } from "@app-types/season.types";
import dayjs from "dayjs";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditSeasonRequest = {
  id: 0,
  name: "",
  from_date: dayjs().toISOString(),
  to_date: dayjs().add(6, "months").toISOString(),
};

const EditSeason = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const query = useGetById<EditSeasonRequest>(selectedId, {
    defaultValues,
    queryKey: "season:get-by-id",
    queryFn: seasons.fetchById,
  });

  const { methods, onSubmit } = useEditForm<EditSeasonRequest>({
    defaultValues: query.data as EditSeasonRequest,
    mutationKey: "season:edit",
    mutationFn: seasons.updateById,
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Season" onClose={onClose}>
      <DialogContent>
        <SeasonForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditSeason;
