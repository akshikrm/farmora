import FilterSeasonOverview from "./filter";
import { useMemo } from "react";
import DataNotFound from "@components/data-not-found";
import Ternary from "@components/ternary";
import useGetSeasonOverview from "../hooks/use-get-season-overview";
import SeasonInformation from "./season-information";
import BatchOverviewTable from "./batch-overview";
import GeneralCostTable from "./general-cost";
import GeneralSalesTable from "./general-sales";
import {
  calculateTotalGenaralCost,
  calculateTotalGenaralSale,
  calculateTotalProfit,
} from "../utils";
import InvestorProfitSummary from "./investor-profit-summary";

const SeasonOverviewTable = () => {
  const { onFilter, overview } = useGetSeasonOverview();

  const isNotEmpty = useMemo(() => {
    return overview.season !== null;
  }, [overview]);

  const totalProfit = calculateTotalProfit(overview.batches);
  const totalGeneralCost = calculateTotalGenaralCost(overview.general_costs);
  const totalGeneralSale = calculateTotalGenaralSale(overview.general_sales);

  return (
    <>
      <FilterSeasonOverview onFilter={onFilter} />
      <Ternary
        when={isNotEmpty}
        then={
          <>
            <SeasonInformation
              name={overview.season?.name || ""}
              batchLength={overview.batches.length}
              closedOn={overview.season?.closed_on || null}
              season_id={overview.season?.id || null}
            />
            <div className="mb-6">
              <BatchOverviewTable
                batches={overview.batches}
                totals={overview.totals}
              />
            </div>
            <div className="flex gap-6 mb-6">
              <GeneralCostTable generalCost={overview.general_costs} />
              <GeneralSalesTable generalSales={overview.general_sales} />
            </div>
            <InvestorProfitSummary
              totalProfit={totalProfit}
              totalGeneralCost={totalGeneralCost}
              totalGeneralSale={totalGeneralSale}
            />
          </>
        }
        otherwise={
          <DataNotFound
            title="No data found"
            description="No overview data found for the selected season"
          />
        }
      />
    </>
  );
};

export default SeasonOverviewTable;
