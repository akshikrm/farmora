import PageTitle from "@components/PageTitle";
import IntegrationBookTable from "./components/table";

const IntegrationBookPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Integration Book" />
      </div>
      <IntegrationBookTable />
    </>
  );
};

export default IntegrationBookPage;
