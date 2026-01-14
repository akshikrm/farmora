import PageTitle from "@components/PageTitle";
import SalesBookTable from "./components/table";
import AddSalesBookEntry from "./components/add";
import { Button } from "@mui/material";
import { useState } from "react";

const SalesBookPage = () => {
  const [isOpen, setOpenAdd] = useState(false);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Sales Book" />
        <Button variant="contained" onClick={onOpen}>
          Add Sales Book Entry
        </Button>
      </div>
      <SalesBookTable />
      <AddSalesBookEntry isShow={isOpen} onClose={onClose} />
    </>
  );
};

export default SalesBookPage;
