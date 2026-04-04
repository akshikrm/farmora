import PageTitle from "@components/PageTitle";
import GeneralExpenseTable from "./components/table";
import AddGeneralExpense from "./components/add";
import EditGeneralExpense from "./components/edit";
import { Button } from "@mui/material";
import { useState } from "react";
import FilterGeneralExpense from "./components/filter";
import type {
  GeneralExpenseFilterRequest,
  GeneralExpenseListResponse,
} from "@app-types/general-expense.types";
import generalExpense from "@api/general-expense.api";

const GeneralExpensePage = () => {
  const [isOpen, setOpenAdd] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onOpen = () => setOpenAdd(true);
  const onClose = () => setOpenAdd(false);

  const [generalExpenseList, setGeneralExpenseList] =
    useState<GeneralExpenseListResponse>([]);
  const onFilter = async (inputData: GeneralExpenseFilterRequest) => {
    const res = await generalExpense.fetchAll(inputData);
    if (res.status === "success") {
      if (res.data) {
        setGeneralExpenseList(res.data);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="General Expense" />
        <Button variant="contained" onClick={onOpen}>
          Add General Expense
        </Button>
      </div>
      <FilterGeneralExpense onFilter={onFilter} />
      <GeneralExpenseTable
        onEdit={(id) => setSelectedId(id)}
        data={generalExpenseList}
      />
      <AddGeneralExpense isShow={isOpen} onClose={onClose} />
      <EditGeneralExpense
        selectedId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
};

export default GeneralExpensePage;
