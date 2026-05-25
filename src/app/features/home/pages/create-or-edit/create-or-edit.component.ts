import { Transaction } from './../../../../shared/transaction/interface/transaction';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TransactionType } from '../../../../shared/transaction/enum/transaction-type';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionsService } from '../../../../shared/transaction/service/transactions.service';
import { TransactionCreate } from '../../../../shared/transaction/interface/transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../../../../shared/transaction/service/feedback.service';

@Component({
  selector: 'app-create-or-edit',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatPrefix,
    ReactiveFormsModule,
    MatButton,
    MatButtonToggleGroup,
    MatButtonToggle,
    NgxMaskDirective,
  ],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.scss',
})
export class CreateOrEditComponent {
  private _transactionsService = inject(TransactionsService);
  private _router = inject(Router);
  private _feedbackService = inject(FeedbackService);
  readonly transactionType = TransactionType;
  readonly activatedRoute = inject(ActivatedRoute);

  get transaction(): Transaction {
    return this.activatedRoute.snapshot.data['transaction'];
  }

  form = new FormGroup({
    type: new FormControl(this.transaction?.type ?? '', {
      validators: [Validators.required],
    }),
    title: new FormControl(this.transaction?.title ?? '', {
      validators: [Validators.required],
    }),
    value: new FormControl(this.transaction?.value ?? 0, {
      validators: [Validators.required],
    }),
  });

  get isEdit(): boolean {
    return !!this.transaction;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const transaction: TransactionCreate = {
      type: this.form.value.type as TransactionType,
      title: this.form.value.title as string,
      value: this.form.value.value as number,
    };

    if (this.isEdit) {
      this._transactionsService.edit(this.transaction.id, transaction).subscribe({
        next: () => {
          this._feedbackService.success('Transação criada com sucesso!');
          this._router.navigate(['/']);
        },
      });
    } else {
      this._transactionsService.create(transaction).subscribe({
        next: () => {
          this._feedbackService.success('Transação criada com sucesso!');
          this._router.navigate(['/']);
        },
      });
    }
  }
}
