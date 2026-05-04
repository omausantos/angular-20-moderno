import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TransactionType } from '../../../../shared/transaction/enum/transaction-type';
import { NgxMaskDirective } from 'ngx-mask';
import { JsonPipe } from '@angular/common';
import { TransactionsService } from '../../../../shared/transaction/service/transactions.service';
import { TransactionCreate } from '../../../../shared/transaction/interface/transaction';

@Component({
  selector: 'app-create',
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
    JsonPipe,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  private _transactionsService = inject(TransactionsService);
  readonly transactionType = TransactionType;

  form = new FormGroup({
    type: new FormControl('', {
      validators: [Validators.required],
    }),
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    value: new FormControl(0, {
      validators: [Validators.required],
    }),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const transaction: TransactionCreate = {
      type: this.form.value.type as TransactionType,
      title: this.form.value.title as string,
      value: this.form.value.value as number,
    };

    this._transactionsService.create(transaction).subscribe();
  }
}
