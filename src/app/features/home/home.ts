import { Component, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interface/transaction';
import { TransactionType } from '../../shared/transaction/enum/transaction-type';
import { EmptyStateComponent } from "./components/empty-state/empty-state.component";

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, EmptyStateComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  transactions = signal<Transaction[]>([
    // { title: 'Salário', type: TransactionType.INCOME, value: 1000 },
    // { title: 'Aluguel', type: TransactionType.OUTCOME, value: 500 },
    // { title: 'Mercado', type: TransactionType.OUTCOME, value: 500 },
  ]);
}
