import { Component, computed, input } from '@angular/core';
import { BalanceCard } from './components/balance-card/balance-card';
import { Transaction } from '../../../../shared/transaction/interface/transaction';
import { TransactionType } from '../../../../shared/transaction/enum/transaction-type';

@Component({
  selector: 'app-balance',
  imports: [BalanceCard],
  templateUrl: './balance.html',
  styleUrl: './balance.scss',
})
export class Balance {
  transactions = input.required<Array<Transaction>>();

  transactionsIncome = computed(() =>
    this.transactions()
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((acc, t) => acc + t.value, 0),
  );

  transactionsOutcome = computed(() =>
    this.transactions()
      .filter((t) => t.type === TransactionType.OUTCOME)
      .reduce((acc, t) => acc + t.value, 0),
  );

  balance = computed(() => this.transactionsIncome() - this.transactionsOutcome());
}
