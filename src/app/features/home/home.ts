import { Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interface/transaction';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { TransactionsService } from '../../shared/transaction/service/transactions.service';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Balance, TransactionItem, EmptyStateComponent, MatButton, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private _transactionsService = inject(TransactionsService);
  private _router = inject(Router);
  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTransactions();
  }

  edit(transaction: Transaction) {
    this._router.navigate(['edit', transaction.id]);
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
