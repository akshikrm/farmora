import { Dialog, DialogContent } from "@components/dialog";
import UserForm from "./user-form";
import { useEffect, useMemo } from "react";
import type { EditUserRequest } from "@app-types/users.types";
import { useForm } from "react-hook-form";
import user from "@api/users.api";
import { useQuery } from "@tanstack/react-query";

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
  user_type: 0,
  parent_id: 0,
};

const EditUser = ({ selectedId, onClose }: Props) => {
  const isShow = useMemo(() => selectedId !== null, [selectedId]);

  const query = useQuery({
    queryKey: ["user", selectedId],
    queryFn: async (): Promise<EditUserRequest> =>
      await user.fetchById(selectedId!),
    enabled: isShow,
  });

  const methods = useForm<EditUserRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (query.data) {
      methods.reset(query.data);
    }

    if (selectedId === null) {
      methods.reset(defaultValues);
    }
  }, [query.data, methods, selectedId]);

  const onSubmit = () => {
    console.log("edit user submit");
  };

  return (
    <>
      <Dialog headerTitle="edit New User" isOpen={isShow} onClose={onClose}>
        <DialogContent>
          <p className="text-gray-700">edit a new user to the system.</p>
          <UserForm methods={methods} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUser;
