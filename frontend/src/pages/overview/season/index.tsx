import PageTitle from "@components/PageTitle";
import SeasonOverviewTable from "./components/table";

const SeasonOverviewPage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageTitle title="Season Overview" />
      </div>
      <SeasonOverviewTable />
    </>
  );
};

export default SeasonOverviewPage;
