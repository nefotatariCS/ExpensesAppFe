export interface Expense {
  id?: number;
  description?: string;
  currency?: string;
  amount?: number;
  transactionDate: Date;
  transactionStatus?: string;
}

export interface AllExpnesesReponse {
  expenses?: Expense[];
  totalRecords?: number;
}
