import { Dialog, DialogContent } from "@components/dialog";
import EmployeeForm from "./employee-form";
import type { EmployeeFormValues } from "@app-types/employees.types";
import employee from "@api/employees.api";
import type { DefaultValues } from "react-hook-form";

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

  const onSubmit = async (inputData: EmployeeFormValues) => {
    const res = await employee.create(inputData);
    if (res.status === "success") {
      onClose();
      refetch();
    }
  };

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
