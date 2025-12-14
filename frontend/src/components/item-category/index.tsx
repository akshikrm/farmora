import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddItemCategory from "./components/add";
import ItemCategoryTable from "./components/table";
import EditItemCategory from "./components/edit";

const ItemCategoryPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Item Category" />
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          Add Item Category
        </button>
      </div>
      <div className="mt-6">
        <ItemCategoryTable onEdit={(id) => setSelectedId(id)} />
      </div>
      <AddItemCategory isShow={isOpen} onClose={onClose} />
      <EditItemCategory
        selectedId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
};

export default ItemCategoryPage;
