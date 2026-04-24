import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TransactionType } from '../../../../shared/transaction/enum/transaction-type';

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
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  readonly transactionType = TransactionType;

  form = new FormGroup({
    type: new FormControl('', {
      validators: [Validators.required],
    }),
    title: new FormControl('', {
      validators: [Validators.required],
    }),
    value: new FormControl('', {
      validators: [Validators.required],
    }),
  });
}
