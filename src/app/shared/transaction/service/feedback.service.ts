import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private _snackBar = inject(MatSnackBar);

  public success(message: string) {
    this._snackBar.open(message, 'Fechar', {
      panelClass: ['snack-bar-success'],
    });
  }
}
