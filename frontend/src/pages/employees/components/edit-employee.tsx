import { Dialog, DialogContent } from "@components/dialog";
import EmployeeForm from "./employee-form";
import Ternary from "@components/ternary";
import useGetEmployeeById from "../hooks/use-get-employee-by-id";
import useEditEmployee from "../hooks/use-edit-employee";

type Props = {
  selectedId: number | null;
  refetch: () => void;
  onClose: () => void;
};

const EditEmployee = (props: Props) => {
  const { selectedId, onClose, refetch } = props;
  const { dataLoaded, selectedData } = useGetEmployeeById(selectedId);
  const { onSubmit } = useEditEmployee(selectedId, {
    onSuccess: () => {
      refetch();
      onClose();
    },
  });
  const isShow = selectedId !== null;

  return (
    <>
      <Dialog headerTitle="Edit Employee" isOpen={isShow} onClose={onClose}>
        <DialogContent>
          <Ternary
            when={dataLoaded}
            then={
              <EmployeeForm
                onSubmit={onSubmit}
                defaultValues={selectedData}
                hidePassword
              />
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditEmployee;
