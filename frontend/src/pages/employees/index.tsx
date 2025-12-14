import { useState } from "react";
import PageTitle from "@components/PageTitle";
import AddNewEmployee from "./components/add-new-employee";
import EditEmployee from "./components/edit-employee";
import EmployeesTable from "./components/table";

const EmployeesPage = () => {
  const [isDialogOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle title="Employees" />
        <button
          onClick={() => setOpenAdd(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>
      <div className="mt-6">
        <EmployeesTable onEdit={setSelectedId} />
      </div>
      <AddNewEmployee isShow={isDialogOpen} onClose={() => setOpenAdd(false)} />
      <EditEmployee selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </div>
  );
};

export default EmployeesPage;
