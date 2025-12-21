import { useState } from "react";
import PageTitle from "@components/PageTitle";
import AddNewEmployee from "./components/add-new-employee";
import EditEmployee from "./components/edit-employee";
import EmployeesTable from "./components/table";
import { Button } from "@mui/material";

const EmployeesPage = () => {
  const [isDialogOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageTitle title="Employees" />
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add Employee
        </Button>
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
