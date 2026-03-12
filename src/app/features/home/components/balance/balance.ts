import { Component, computed, input } from '@angular/core';
import { BalanceCard } from './components/balance-card/balance-card';

@Component({
  selector: 'app-balance',
  imports: [BalanceCard],
  templateUrl: './balance.html',
  styleUrl: './balance.scss',
})
export class Balance {
  transations = input.required<Array<{ type: 'income' | 'outcome' | string; value: number }>>();

  transationsIncome = computed(() =>
    this.transations()
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.value, 0),
  );

  transationsOutcome = computed(() =>
    this.transations()
      .filter((t) => t.type === 'outcome')
      .reduce((acc, t) => acc + t.value, 0),
  );

  balance = computed(() => this.transationsIncome() - this.transationsOutcome());
}
