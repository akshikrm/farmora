import PageTitle from "@components/PageTitle";
import { useState } from "react";
import AddVendor from "./components/add";
import VendorTable from "./components/table";
import EditVendor from "./components/edit";

const VendorPage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle title="Vendor" />
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          Add Vendor
        </button>
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
