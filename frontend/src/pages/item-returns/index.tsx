import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddItemReturn from "./components/add";
import ItemReturnTable from "./components/table";
import EditItemReturn from "./components/edit";

const ItemReturnPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Item Returns" />
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          Add Return
        </button>
      </div>

      <div className="mt-6">
        <ItemReturnTable onEdit={(id) => setSelectedId(id)} />
      </div>
      <AddItemReturn isShow={isOpen} onClose={onClose} />
      <EditItemReturn selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
};

export default ItemReturnPage;
