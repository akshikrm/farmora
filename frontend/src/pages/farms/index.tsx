import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddFarm from "./components/add-farm";
import EditFarm from "./components/edit-farm";
import FarmTable from "./components/table";
import { Button } from "@mui/material";

const FarmsPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Farms" />
        <Button variant="contained" onClick={onOpen}>
          Add Farms
        </Button>
      </div>
      <div className="mt-6">
        <FarmTable onEdit={(id) => setSelectedId(id)} />
      </div>
      <AddFarm isShow={isOpen} onClose={onClose} />
      <EditFarm selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
};

export default FarmsPage;
