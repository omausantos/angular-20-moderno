import { Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interface/transaction';
import { TransactionType } from '../../shared/transaction/enum/transaction-type';
import { EmptyStateComponent } from "./components/empty-state/empty-state.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, EmptyStateComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  private _httpClient = inject(HttpClient);
  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTransactions();
  }

  public getTransactions() {
    this._httpClient.get<Transaction[]>('http://localhost:3000/transactions')
      .subscribe((transactions) => this.transactions.set(transactions));
  }
}
