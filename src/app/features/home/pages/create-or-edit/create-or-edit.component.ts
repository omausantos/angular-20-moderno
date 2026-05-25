import {
  Transaction,
  TransactionPayload,
} from './../../../../shared/transaction/interface/transaction';
import { Component, inject, computed, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TransactionType } from '../../../../shared/transaction/enum/transaction-type';
import { NgxMaskDirective } from 'ngx-mask';
import { TransactionsService } from '../../../../shared/transaction/service/transactions.service';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../../shared/transaction/service/feedback.service';
import { Observable, tap } from 'rxjs';

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
  transaction = input<Transaction>();

  form = computed<FormGroup>(
    () =>
      new FormGroup({
        type: new FormControl(this.transaction()?.type ?? '', {
          validators: [Validators.required],
        }),
        title: new FormControl(this.transaction()?.title ?? '', {
          validators: [Validators.required],
        }),
        value: new FormControl(this.transaction()?.value ?? 0, {
          validators: [Validators.required],
        }),
      }),
  );

  isEdit = computed<boolean>(() => !!this.transaction());

  private _createOrEdit(transaction: TransactionPayload): Observable<Transaction> {
    if (this.isEdit()) {
      return this._transactionsService
        .edit(this.transaction()!.id, transaction)
        .pipe(tap(() => this._feedbackService.success('Transação editada com sucesso!')));
    } else {
      return this._transactionsService
        .create(transaction)
        .pipe(tap(() => this._feedbackService.success('Transação criada com sucesso!')));
    }
  }

  onSubmit(): void {
    if (this.form().invalid) {
      return;
    }

    const transaction: TransactionPayload = {
      type: this.form().value.type as TransactionType,
      title: this.form().value.title as string,
      value: this.form().value.value as number,
    };

    this._createOrEdit(transaction).subscribe({
      next: () => {
        this._router.navigate(['/']);
      },
    });
  }
}
