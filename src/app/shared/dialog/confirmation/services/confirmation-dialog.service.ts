import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialog } from '../interfaces/confirmation-dialog';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  readonly dialog = inject(MatDialog);

  public open(data: ConfirmationDialog): Observable<boolean> {
    return this.dialog
      .open(ConfirmationDialogComponent, { data })
      .afterClosed()
      .pipe(filter((result: boolean) => result === true));
  }
}
