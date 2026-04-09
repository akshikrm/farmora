import PageTitle from "@components/PageTitle";
import WorkingCostTable from "./components/table";
import AddWorkingCost from "./components/add";
import FilterWorkingCost from "./components/filter";
import { Button } from "@mui/material";
import { useState } from "react";
import useGetWorkingCost from "./hooks/use-get-working-cost";
import type { WorkingCostFilterRequest } from "./types";

const WorkingCostPage = () => {
  const [isOpen, setOpenAdd] = useState(false);

  const { workingCostList, handleFetchAllWorkingCost } = useGetWorkingCost();

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  const onFilter = async (inputData: WorkingCostFilterRequest) => {
    await handleFetchAllWorkingCost(inputData);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Working Cost" />
        <Button variant="contained" onClick={onOpen}>
          Add Working Cost Entry
        </Button>
      </div>
      <FilterWorkingCost onFilter={onFilter} />
      <WorkingCostTable
        data={workingCostList}
        onEdit={(id) => console.log("Edit", id)}
      />
      <AddWorkingCost
        isShow={isOpen}
        onClose={onClose}
        refetch={handleFetchAllWorkingCost}
      />
    </>
  );
};

export default WorkingCostPage;
