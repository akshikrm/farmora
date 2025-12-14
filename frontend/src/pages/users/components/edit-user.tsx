import { Dialog, DialogContent } from "@components/dialog";
import UserForm from "./user-form";
import { useEffect } from "react";
import type { EditUserRequest } from "@app-types/users.types";
import { useForm } from "react-hook-form";
import user from "@api/users.api";
import useGetById from "@hooks/use-get-by-id";
import useEditForm from "@hooks/use-edit-form";

type Props = {
  selectedId: number | null;
  onClose: () => void;
};

const defaultValues: EditUserRequest = {
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

const EditUser = ({ selectedId, onClose }: Props) => {
  const isShow = selectedId !== null;

  const query = useGetById(selectedId, {
    queryKey: "user:get-by-id",
    queryFn: user.fetchById,
    defaultValues,
  });

  const { methods, onSubmit } = useEditForm<EditUserRequest>({
    defaultValues: query.data as EditUserRequest,
    mutationKey: "user:edit",
    mutationFn: user.updateById,
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <>
      <Dialog headerTitle="edit New User" isOpen={isShow} onClose={onClose}>
        <DialogContent>
          <p className="text-gray-700">edit a new user to the system.</p>
          <UserForm methods={methods} onSubmit={onSubmit} fields={fields} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUser;
