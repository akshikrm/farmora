import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddItem from "./components/add";
import ItemTable from "./components/table";
import EditItem from "./components/edit";

const ItemPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Item" />
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          Add Item
        </button>
      </div>

      <div className="mt-6">
        <ItemTable onEdit={(id) => setSelectedId(id)} />
      </div>
      <AddItem isShow={isOpen} onClose={onClose} />
      <EditItem selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
};

export default ItemPage;
