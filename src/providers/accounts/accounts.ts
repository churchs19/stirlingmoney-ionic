import { Injectable } from '@angular/core';
import 'rxjs';
import 'rxjs/add/operator/map';

import { } from 'angularfire2';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from 'angularfire2/database';
import { AuthenticationProvider } from '../authentication/authentication';

/*
  Generated class for the AccountsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccountsProvider {

  constructor(private db: AngularFireDatabase, private authProvider: AuthenticationProvider) {

  }

  public list(): AngularFireList<Account> {
    var list = this.db.list<Account>('/accounts/' + this.authProvider.uid());
    return list;
  }

  public get(id: string): AngularFireObject<Account> {
    return this.db.object<Account>('/accounts/' + this.authProvider.uid() + '/' + id);
  }

  public delete(id: string) {
    return this.db.object('/accounts/' + this.authProvider.uid() + '/' + id).remove();
  }

  public upsert(account: any): any {
    if(account.id) {
      var id = account.id;
      delete account.id;
      return this.db.object('/accounts/' + this.authProvider.uid() + '/' + id).update(account);
    } else {
      return this.db.list('/accounts/'  + this.authProvider.uid() + '/').push(account);
    }
  }
}
