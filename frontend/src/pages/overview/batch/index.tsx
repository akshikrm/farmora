import PageTitle from "@components/PageTitle";
import BatchOverviewTable from "./components/table";

const BatchOverviewPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Batch Overview" />
      </div>
      <BatchOverviewTable />
    </>
  );
};

export default BatchOverviewPage;
