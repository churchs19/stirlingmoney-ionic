export class AddEditAccountModel {
  constructor(
    public accountName: string,
    public initialBalance: number,
    public accountId?: string,
    public image?: string
  ) {  }
}
