import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

type CssType = 'income' | 'outcome' | 'balance';
enum ValueCssType {
  Income = 'income',
  Outcome = 'outcome',
  Zero = 'zero',
}

@Component({
  selector: 'app-balance-card',
  imports: [MatCardModule],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {
  type = input.required<CssType>();
  label = input.required<string>();
  value = input.required<number>();

  cssClass = computed<ValueCssType>(() => {
    if (this.type() === 'income') {
      return ValueCssType.Income;
    } else if (this.type() === 'outcome') {
      return ValueCssType.Outcome;
    }
    if (this.value() === 0) {
      return ValueCssType.Zero;
    }
    return this.value() >= 0 ? ValueCssType.Income : ValueCssType.Outcome;
  });
}
