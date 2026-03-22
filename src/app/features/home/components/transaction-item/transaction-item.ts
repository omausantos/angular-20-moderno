import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Transaction } from '../../../../shared/transaction/interface/transaction';

@Component({
  selector: 'app-transaction-item',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
})
export class TransactionItem {

  transaction = input.required<Transaction>();
}
