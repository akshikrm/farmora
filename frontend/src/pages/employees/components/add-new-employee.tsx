import { Dialog, DialogContent } from "@components/dialog";
import EmployeeForm from "./employee-form";
import type { NewEmployeeRequest } from "@app-types/employees.types";
import useAddForm from "@hooks/use-add-form";
import employee from "@api/employees.api";

const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "name" },
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "username",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "password",
  },
] as const;

const defaultValues: NewEmployeeRequest = {
  name: "",
  username: "",
  password: "",
  package_id: 1,
  status: 1,
};

const AddNewEmployee = ({
  isShow,
  onClose,
}: {
  isShow: boolean;
  onClose: () => void;
}) => {
  const { methods, onSubmit } = useAddForm({
    defaultValues,
    mutationFn: employee.create,
    mutationKey: "employee:add",
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <>
      <Dialog headerTitle="Add New Employee" isOpen={isShow} onClose={onClose}>
        <DialogContent>
          <p className="text-gray-700">Add a new employee to the system.</p>
          <EmployeeForm methods={methods} onSubmit={onSubmit} fields={fields} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewEmployee;
