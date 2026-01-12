import type { 
  GeneralExpenseListResponse,
  NewGeneralExpenseRequest,
  EditGeneralExpenseRequest,
  EditGeneralExpensePayload,
  GeneralExpenseRecord,
} from "@app-types/general-expense.types";
import fetcher from "@utils/fetcher";

const generalExpense = {
  fetchAll: (filter: {
    season_id: number;
    start_date?: string;
    end_date?: string;
  }): Promise<GeneralExpenseListResponse> => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcher("general-expenses", null, opts);
  },
  fetchById: (id: number): Promise<GeneralExpenseRecord> => 
    fetcher(`general-expenses/${id}`),
  create: async (payload: NewGeneralExpenseRequest) =>
    await fetcher("general-expenses", JSON.stringify(payload), { method: "POST" }),
  updateById: async (id: number, updateData: EditGeneralExpenseRequest) => {
    const payload: EditGeneralExpensePayload = {
      season_id: updateData.season_id,
      purpose: updateData.purpose,
      amount: updateData.amount,
      narration: updateData.narration,
    };
    return await fetcher(`general-expenses/${id}`, JSON.stringify(payload), {
      method: "PUT",
    });
  },
  deleteById: async (id: number) =>
    await fetcher(`general-expenses/${id}`, null, { method: "DELETE" }),
};

export default generalExpense;
