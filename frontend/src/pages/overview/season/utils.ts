import type {
  BatchOverviewItem,
  GeneralCostItem,
  GeneralSaleItem,
} from "./types";

export const calculateTotalProfit = (batches: BatchOverviewItem[]) =>
  batches.reduce((acc, curr) => {
    const { total_sale_amount, total_expense } = curr.overviewCalculations;
    const profit = total_sale_amount - total_expense;
    return acc + profit;
  }, 0);

export const calculateTotalGenaralCost = (generalCosts: GeneralCostItem[]) =>
  generalCosts.reduce((acc, curr) => acc + curr.amount, 0);

export const calculateTotalGenaralSale = (generalSales: GeneralSaleItem[]) =>
  generalSales.reduce((acc, curr) => acc + curr.amount, 0);
