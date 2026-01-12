import { Dialog, DialogContent } from "@components/dialog";
import GeneralExpenseForm from "./form";
import useEditForm from "@hooks/use-edit-form";
import useGetById from "@hooks/use-get-by-id";
import generalExpense from "@api/general-expense.api";
import type { EditGeneralExpenseRequest } from "@app-types/general-expense.types";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditGeneralExpenseRequest = {
  id: 0,
  season_id: null,
  purpose: "",
  amount: "",
  narration: "",
};

const EditGeneralExpense = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const query = useGetById<EditGeneralExpenseRequest>(selectedId, {
    defaultValues,
    queryKey: "general-expense:get-by-id",
    queryFn: generalExpense.fetchById,
  });

  const { methods, onSubmit } = useEditForm<EditGeneralExpenseRequest>({
    defaultValues: query.data as EditGeneralExpenseRequest,
    mutationKey: "general-expense:edit",
    mutationFn: generalExpense.updateById,
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Edit General Expense" onClose={handleClose}>
      <DialogContent>
        <GeneralExpenseForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditGeneralExpense;
