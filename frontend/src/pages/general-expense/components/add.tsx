import { Dialog, DialogContent } from "@components/dialog";
import useAddForm from "@hooks/use-add-form";
import generalExpense from "@api/general-expense.api";
import type { NewGeneralExpenseRequest } from "@app-types/general-expense.types";
import GeneralExpenseForm from "./form";

const defaultValues: NewGeneralExpenseRequest = {
  season_id: null,
  purpose: "",
  amount: "",
  narration: "",
};

type Props = {
  isShow: boolean;
  onClose: () => void;
};

const AddGeneralExpense = ({ isShow, onClose }: Props) => {
  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const { methods, onSubmit } = useAddForm<NewGeneralExpenseRequest>({
    defaultValues,
    mutationFn: generalExpense.create,
    mutationKey: "general-expense:add",
    onSuccess: () => {
      handleClose();
    },
  });

  return (
    <Dialog isOpen={isShow} headerTitle="Add General Expense" onClose={handleClose}>
      <DialogContent>
        <GeneralExpenseForm methods={methods} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddGeneralExpense;
