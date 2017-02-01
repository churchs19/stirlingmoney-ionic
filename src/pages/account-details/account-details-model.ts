import { AccountTransactionDateModel } from './account-transaction-date-model';

export class AccountDetailsModel {
  constructor(
    public accountId: string,
    public accountName: string,
    public postedBalance: number,
    public availableBalance: number,
    public transactionDates: Array<AccountTransactionDateModel>,
    public image?: string
  ) {  }
}
