import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction, TransactionPayload } from '../interface/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private _httpClient = inject(HttpClient);

  public getAll(): Observable<Transaction[]> {
    return this._httpClient.get<Transaction[]>('http://localhost:3000/transactions');
  }

  public getById(id: string): Observable<Transaction> {
    return this._httpClient.get<Transaction>(`http://localhost:3000/transactions/${id}`);
  }

  // criar um unico
  public create(transaction: TransactionPayload): Observable<Transaction> {
    return this._httpClient.post<Transaction>('http://localhost:3000/transactions', transaction);
  }

  public edit(id: number, transaction: TransactionPayload): Observable<Transaction> {
    return this._httpClient.put<Transaction>(`http://localhost:3000/transactions/${id}`, transaction);
  }
}
