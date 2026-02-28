import { Dialog, DialogContent } from "@components/dialog";
import EmployeeForm from "./employee-form";
import type { DefaultValues } from "react-hook-form";
import type { EmployeeFormValues } from "../types";
import useAddEmployee from "../hooks/use-add-employee";

const defaultValues: DefaultValues<EmployeeFormValues> = {
  name: "",
  username: "",
  password: "",
};

type AddNewEmployeeType = {
  isShow: boolean;
  refetch: () => void;
  onClose: () => void;
};

const AddNewEmployee = (props: AddNewEmployeeType) => {
  const { isShow, onClose, refetch } = props;

  const { onSubmit } = useAddEmployee({
    onSuccess: () => {
      onClose();
      refetch();
    },
  });

  return (
    <>
      <Dialog headerTitle="Add New Employee" isOpen={isShow} onClose={onClose}>
        <DialogContent>
          <EmployeeForm defaultValues={defaultValues} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewEmployee;
