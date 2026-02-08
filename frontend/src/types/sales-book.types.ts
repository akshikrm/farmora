export type SalesBookTransaction = {
  created_date: string;
  bird_no: number | null;
  weight: number | null;
  price: number | null;
  amount: number;
  type: "credit" | "cash";
  balance: number;
};

export type SalesBookLedgerResponse = {
  buyer?: {
    id: number;
    name: string;
  } | null;
  opening_balance?: string;
  transactions: SalesBookTransaction[];
  closing_balance?: string;
};

export type SalesBookLedger = {
  buyer: string;
  opening_balance: string;
  transactions: SalesBookTransaction[];
  closing_balance: string;
};

export type SalesBookFilterRequest = {
  buyer_id: string;
  from_date: string;
  end_date: string;
};

export type NewSalesBookEntryRequest = {
  date: string;
  buyer_id: number | null;
  amount: string;
  narration?: string;
};
