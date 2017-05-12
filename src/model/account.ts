export class Account
{
  constructor(public $key: string = '',
              public name: string,
              public initialBalance: number,
              public availableBalance: number,
              public postedBalance: number,
              public icon: string = '') {
  }
}
