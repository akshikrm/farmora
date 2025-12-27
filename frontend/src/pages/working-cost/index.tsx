import PageTitle from "@components/PageTitle";
import WorkingCostTable from "./components/table";
import AddWorkingCost from "./components/add";
import { Button } from "@mui/material";
import { useState } from "react";

const WorkingCostPage = () => {
  const [isOpen, setOpenAdd] = useState(false);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Working Cost" />
        <Button variant="contained" onClick={onOpen}>
          Add Working Cost Entry
        </Button>
      </div>
      <WorkingCostTable />
      <AddWorkingCost isShow={isOpen} onClose={onClose} />
    </>
  );
};

export default WorkingCostPage;
