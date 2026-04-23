import { Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interface/transaction';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { TransactionsService } from '../../shared/transaction/service/transactions.service';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, EmptyStateComponent, MatButton, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private _transactionsService = inject(TransactionsService);
  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTransactions();
  }

  public getTransactions() {
    this._transactionsService.getAll().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
