export class AccountTransactionModel {
  constructor(
    public transactionId: string,
    public location: string,
    public amount: number,
    public posted: boolean
  ) { }
}
