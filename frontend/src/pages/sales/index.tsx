import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddSale from "./components/add";
import SalesTable from "./components/table";
import EditSale from "./components/edit";
import { Button } from "@mui/material";

const SalesPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Sales" />
        <Button variant="contained" onClick={onOpen}>
          Add Sale
        </Button>
      </div>

      <div className="mt-6">
        <SalesTable onEdit={(id) => setSelectedId(id)} />
      </div>
      <AddSale isShow={isOpen} onClose={onClose} />
      <EditSale selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
};

export default SalesPage;
