export class Account
{
  constructor(
    public name: string,
    public userGroupId: string,
    public initialBalance: number = 0,
    public availableBalance: number = 0,
    public postedBalance: number = 0,
    public icon: string = '',
    public id?: string
  ) {}
}
