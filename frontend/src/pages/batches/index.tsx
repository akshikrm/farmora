import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddBatch from "./components/add";
import BatchTable from "./components/table";
import EditBatch from "./components/edit";

const BatchPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Batch" />;
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          Add Batch
        </button>
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
