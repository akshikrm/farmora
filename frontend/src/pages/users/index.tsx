import { useState } from "react";
import PageTitle from "@components/PageTitle";
import AddNewUser from "./components/add-new-user";
import EditUser from "./components/edit-user";
import UsersTable from "./components/table";

const UsersPage = () => {
  const [isDialogOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle title="Users" />
        <button
          onClick={() => setOpenAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          Add User
        </button>
      </div>
      <div className="mt-6">
        <UsersTable onEdit={setSelectedId} />
      </div>
      <AddNewUser isShow={isDialogOpen} onClose={() => setOpenAdd(false)} />
      <EditUser selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </div>
  );
};

export default UsersPage;
