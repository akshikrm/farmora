export type SalesBookTransaction = {
  created_date: string;
  bird_no: number | null;
  weight: number | null;
  price: number | null;
  amount: number;
  type: "credit" | "cash";
  balance: number;
};

export type SalesBookLedger = {
  buyer: {
    id: number;
    name: string;
  } | null;
  opening_balance: number;
  transactions: SalesBookTransaction[];
  closing_balance: number;
};

export type SalesBookFilterRequest = {
  buyer_id: number | null;
  from_date: string;
  end_date: string;
};

export type NewSalesBookEntryRequest = {
  date: string;
  buyer_id: number | null;
  amount: string;
  narration?: string;
};
