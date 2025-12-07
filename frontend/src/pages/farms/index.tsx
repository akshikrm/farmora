import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddFarm from "./components/add-farm";
import EditFarm from "./components/edit-farm";
import FarmTable from "./components/table";

const FarmsPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Farms" />;
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          Add Farms
        </button>
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
