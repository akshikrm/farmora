import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddBatch from "./components/add";
import BatchTable from "./components/table";
import EditBatch from "./components/edit";
import { Button } from "@mui/material";

const BatchPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Batch" />
        <Button variant="contained" onClick={onOpen}>
          Add Batch
        </Button>
      </div>
      <div className="mt-6">
        <BatchTable onEdit={(id) => setSelectedId(id)} />
      </div>
      <AddBatch isShow={isOpen} onClose={onClose} />
      <EditBatch selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
};

export default BatchPage;
