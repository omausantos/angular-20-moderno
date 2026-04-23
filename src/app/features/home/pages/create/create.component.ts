import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-create',
  imports: [MatFormField, MatInput, MatLabel, MatError, MatPrefix, ReactiveFormsModule, MatButton],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  form = new FormGroup({
    title: new FormControl('', {
      validators: [
        Validators.required,
      ]
    }),
    value: new FormControl('', {
      validators: [
        Validators.required,
      ]
    }),
  });
}
