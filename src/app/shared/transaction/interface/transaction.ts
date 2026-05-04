import { TransactionType } from "../enum/transaction-type";

export interface Transaction {
  id: number;
  title: string;
  type: TransactionType;
  value: number;
}

export type TransactionCreate = Omit<Transaction, 'id'>
