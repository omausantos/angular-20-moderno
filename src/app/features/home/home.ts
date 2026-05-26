import { Component, inject, OnInit, signal } from '@angular/core';
import { Balance } from './components/balance/balance';
import { TransactionItem } from './components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interface/transaction';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { TransactionsService } from '../../shared/transaction/service/transactions.service';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FeedbackService } from '../../shared/transaction/service/feedback.service';
import { ConfirmationDialogService } from '../../shared/dialog/confirmation/services/confirmation-dialog.service';

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
  private _feedbackService = inject(FeedbackService);
  readonly confirmationDialogService = inject(ConfirmationDialogService);

  ngOnInit(): void {
    this.getTransactions();
  }

  edit(transaction: Transaction) {
    this._router.navigate(['edit', transaction.id]);
  }

  remove(transaction: Transaction): void {
    this.confirmationDialogService.open({
      title: 'Excluir transação',
      message: 'Deseja realmente excluir esta transação?',
      yesBtnText: 'Excluir',
    }).subscribe(() => {
      this._transactionsService.remove(transaction.id).subscribe({
        next: () => {
          this.deleteTransactionFromArray(transaction);
          this._feedbackService.success('Transação excluída com sucesso!');
        },
      });
    });
  }

  private deleteTransactionFromArray(transaction: Transaction) {
    this.transactions.update((transactions) =>
      transactions.filter((item) => item.id !== transaction.id),
    );
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
