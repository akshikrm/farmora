import { Dialog, DialogContent } from "@components/dialog";
import EmployeeForm from "./employee-form";
import type { EditEmployeeRequest } from "@app-types/employees.types";
import employee from "@api/employees.api";
import useGetById from "@hooks/use-get-by-id";
import useEditForm from "@hooks/use-edit-form";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditEmployeeRequest = {
  id: 0,
  name: "",
  username: "",
  package_id: 1,
  status: 1,
};

const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "name" },
  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "status",
  },
] as const;

const EditEmployee = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const query = useGetById(selectedId, {
    queryKey: "employee:get-by-id",
    queryFn: employee.fetchById,
    defaultValues,
  });

  const { methods, onSubmit } = useEditForm<EditEmployeeRequest>({
    defaultValues: query.data as EditEmployeeRequest,
    mutationKey: "employee:edit",
    mutationFn: employee.updateById,
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <>
      <Dialog headerTitle="Edit Employee" isOpen={isShow} onClose={onClose}>
        <DialogContent>
          <p className="text-gray-700">Edit employee information.</p>
          <EmployeeForm methods={methods} onSubmit={onSubmit} fields={fields} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditEmployee;
