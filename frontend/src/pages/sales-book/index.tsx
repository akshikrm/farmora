import PageTitle from "@components/PageTitle";
import SalesBookTable from "./components/table";

const SalesBookPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Sales Book" />
      </div>
      <SalesBookTable />
    </>
  );
};

export default SalesBookPage;
