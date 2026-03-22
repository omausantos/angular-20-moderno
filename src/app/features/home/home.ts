import { Component, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  transations = signal([
    { type: 'income', value: 1000 },
    { type: 'outcome', value: 500 },
    { type: 'outcome', value: 500 },
  ]);
}
