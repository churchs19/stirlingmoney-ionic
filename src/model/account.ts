import { UUID } from 'angular2-uuid';

export class Account
{
  constructor(public name: string,
              public initialBalance: number,
              public availableBalance: number,
              public postedBalance: number,
              public id: string = UUID.UUID(),
              public icon: string = '') {
  }
}
