import PageTitle from "@components/PageTitle";
import IntegrationBookTable from "./components/table";
import AddIntegrationBook from "./components/add";
import { Button } from "@mui/material";
import { useState } from "react";

const IntegrationBookPage = () => {
  const [isOpen, setOpenAdd] = useState(false);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Integration Book" />
        <Button variant="contained" onClick={onOpen}>
          Add Integration Book Entry
        </Button>
      </div>
      <IntegrationBookTable />
      <AddIntegrationBook isShow={isOpen} onClose={onClose} />
    </>
  );
};

export default IntegrationBookPage;
