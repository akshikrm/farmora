import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddVendor from "./components/add";
import VendorTable from "./components/table";
import EditVendor from "./components/edit";
import { Button } from "@mui/material";

const VendorPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Vendor" />
        <Button variant="contained" onClick={onOpen}>
          Add Vendor
        </Button>
      </div>
      <div className="mt-6">
        <VendorTable onEdit={(id) => setSelectedId(id)} />
      </div>
      <AddVendor isShow={isOpen} onClose={onClose} />
      <EditVendor selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
};

export default VendorPage;
