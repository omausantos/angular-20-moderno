import { ResolveFn } from '@angular/router';
import { TransactionsService } from '../../../../../shared/transaction/service/transactions.service';
import { inject } from '@angular/core';
import { Transaction } from '../../../../../shared/transaction/interface/transaction';

export const gettransactionbyidResolver: ResolveFn<Transaction> = (route, state) => {
  const _transactionsService = inject(TransactionsService);
  const id = route.paramMap.get('id') as string;
  return _transactionsService.getById(id);
};
