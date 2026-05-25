import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Transaction } from '../../../../shared/transaction/interface/transaction';
import { TransactionValue } from "./components/transaction-value/transaction-value";
import { CdkAutofill } from "@angular/cdk/text-field";

@Component({
  selector: 'app-transaction-item',
  imports: [MatCardModule, MatButtonModule, TransactionValue, CdkAutofill],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
})
export class TransactionItem {
  transaction = input.required<Transaction>();
  edit = output<Transaction>();
  remove = output<Transaction>();
}
