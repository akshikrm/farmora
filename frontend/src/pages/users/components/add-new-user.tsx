import { Dialog, DialogContent } from "@components/dialog";
import UserForm from "./user-form";
import type { NewUserRequest } from "@app-types/users.types";
import useAddForm from "@hooks/use-add-form";
import user from "@api/users.api";

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

const defaultValues: NewUserRequest = {
  name: "",
  username: "",
  password: "",
  package_id: 1,
  status: 1,
};

const AddNewUser = ({
  isShow,
  onClose,
}: {
  isShow: boolean;
  onClose: () => void;
}) => {
  const { methods, onSubmit } = useAddForm({
    defaultValues,
    mutationFn: user.create,
    mutationKey: "user:add",
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <>
      <Dialog headerTitle="Add New User" isOpen={isShow} onClose={onClose}>
        <DialogContent>
          <p className="text-gray-700">Add a new user to the system.</p>
          <UserForm methods={methods} onSubmit={onSubmit} fields={fields} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewUser;
