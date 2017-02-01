import { AccountTransactionModel } from './account-transaction-model';

export class AccountTransactionDateModel {
  constructor(
    public transactionDate: Date,
    public transactions: Array<AccountTransactionModel>,
  ) { }
}


