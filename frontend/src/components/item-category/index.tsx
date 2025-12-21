import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddItemCategory from "./components/add";
import ItemCategoryTable from "./components/table";
import EditItemCategory from "./components/edit";
import { Button } from "@mui/material";

const ItemCategoryPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Item Category" />
        <Button variant="contained" onClick={onOpen}>
          Add Item Category
        </Button>
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
