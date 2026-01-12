import PageTitle from "@components/PageTitle";
import GeneralExpenseTable from "./components/table";
import AddGeneralExpense from "./components/add";
import EditGeneralExpense from "./components/edit";
import { Button } from "@mui/material";
import { useState } from "react";

const GeneralExpensePage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="General Expense" />
        <Button variant="contained" onClick={onOpen}>
          Add General Expense
        </Button>
      </div>
      <GeneralExpenseTable onEdit={(id) => setSelectedId(id)} />
      <AddGeneralExpense isShow={isOpen} onClose={onClose} />
      <EditGeneralExpense selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
};

export default GeneralExpensePage;
