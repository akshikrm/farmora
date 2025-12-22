import PageTitle from "@components/PageTitle";
import PurchaseBookTable from "./components/table";

const PurchaseBookPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Purchase Book" />
      </div>
      <PurchaseBookTable />
    </>
  );
};

export default PurchaseBookPage;
