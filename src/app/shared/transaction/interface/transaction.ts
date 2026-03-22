import { TransactionType } from "../enum/transaction-type";

export interface Transaction {
  title: string;
  type: TransactionType;
  value: number;
}
