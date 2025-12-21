import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddItem from "./components/add";
import ItemTable from "./components/table";
import EditItem from "./components/edit";
import { Button } from "@mui/material";

const ItemPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Item" />
        <Button variant="contained" onClick={onOpen}>
          Add Item
        </Button>
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
