import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddItem from "./components/add";
import ItemCategory from "./components/table";
import EditItem from "./components/edit";
import { Button } from "@mui/material";

const ItemsPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Items" />
        <Button variant="contained" onClick={onOpen}>
          Add Item
        </Button>
      </div>
      <div className="mt-6">
        <ItemCategory onEdit={(id) => setSelectedId(id)} />
      </div>
      <AddItem isShow={isOpen} onClose={onClose} />
      <EditItem selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
};

export default ItemsPage;
