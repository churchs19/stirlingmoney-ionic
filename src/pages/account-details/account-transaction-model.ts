export class AccountTransactionModel {
  constructor(
    public transactionId: string,
    public date: Date,
    public location: string,
    public amount: number,
    public posted: boolean,
    public description?: string,
  ) { }
}
