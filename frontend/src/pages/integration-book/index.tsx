import PageTitle from "@components/PageTitle";
import IntegrationBookTable from "./components/table";
import AddIntegrationBook from "./components/add";
import FilterIntegrationBook from "./components/filter";
import { Button } from "@mui/material";
import { useState } from "react";
import useGetIntegrationBook from "./hooks/use-get-integration-book";
import type { IntegrationBookFilterRequest } from "./types";

const IntegrationBookPage = () => {
  const [isOpen, setOpenAdd] = useState(false);

  const { integrationBookList, handleFetchAllIntegrationBook } =
    useGetIntegrationBook();

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  const onFilter = async (inputData: IntegrationBookFilterRequest) => {
    await handleFetchAllIntegrationBook(inputData);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Integration Book" />
        <Button variant="contained" onClick={onOpen}>
          Add Integration Book Entry
        </Button>
      </div>
      <FilterIntegrationBook onFilter={onFilter} />
      <IntegrationBookTable data={integrationBookList} />
      <AddIntegrationBook
        isShow={isOpen}
        onClose={onClose}
        refetch={handleFetchAllIntegrationBook}
      />
    </>
  );
};

export default IntegrationBookPage;
