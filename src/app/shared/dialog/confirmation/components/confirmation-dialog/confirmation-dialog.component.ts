import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmationDialog } from '../../interfaces/confirmation-dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  template: `
    <h2 mat-dialog-title>{{ resolvedDialogData().title }}</h2>
    <mat-dialog-content>{{ resolvedDialogData().message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button matButton [mat-dialog-close]="false">{{ resolvedDialogData().noBtnText }}</button>
      <button matButton [mat-dialog-close]="true" cdkFocusInitial>
        {{ resolvedDialogData().yesBtnText }}
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  readonly dialogData = inject<ConfirmationDialog>(MAT_DIALOG_DATA);

  private _defaultDialogData: Partial<ConfirmationDialog> = {
    noBtnText: 'Não',
    yesBtnText: 'Sim',
  };

  resolvedDialogData = computed(() => {
    return {
      ...this._defaultDialogData,
      ...this.dialogData,
    };
  });
}
