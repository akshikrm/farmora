import { Dialog, DialogContent } from "@components/dialog";
import SeasonForm from "./form";
import type { EditFarmRequest } from "@app-types/farms.types";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import seasons from "@api/seasons.api";
import type { EditSeason } from "@app-types/season.types";
import dayjs from "dayjs";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditSeason = {
  id: 0,
  name: "",
  from_date: dayjs().toISOString(),
  to_date: dayjs().add(6, "months").toISOString(),
};

const EditSeason = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const query = useGetById<EditSeason>(selectedId, {
    defaultValues,
    queryKey: "season:get-by-id",
    queryFn: seasons.fetchById,
  });

  const { methods, onSubmit } = useEditForm<EditSeason>({
    defaultValues: query.data as EditSeason,
    mutationKey: "season:edit",
    mutationFn: seasons.updateById,
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit Season" onClose={onClose}>
      <DialogContent>
        <p className="text-gray-700">Edit Season {query.data?.name}</p>
        <SeasonForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditSeason;
