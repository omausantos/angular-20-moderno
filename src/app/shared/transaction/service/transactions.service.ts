import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../interface/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private _httpClient = inject(HttpClient);

  public getAll(): Observable<Transaction[]> {
    return this._httpClient.get<Transaction[]>('http://localhost:3000/transactions');
  }
}
