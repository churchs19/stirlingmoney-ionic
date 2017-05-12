import { Injectable } from '@angular/core';
import 'rxjs';
import 'rxjs/add/operator/map';

import { } from 'angularfire2';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable,
} from 'angularfire2/database';
import { Account } from '../../model/account';

/*
  Generated class for the AccountsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccountsProvider {

  constructor(private db: AngularFireDatabase) {

  }

  public list(): FirebaseListObservable<any> {
    return this.db.list('/accounts');
  }

  public get(id: string): FirebaseObjectObservable<any> {
    return this.db.object('/accounts/' + id);
  }

  public delete(id: string) {
    return this.db.object('/accounts/' + id).remove();
  }

  public upsert(account: any): any {
    if(account.id) {
      var id = account.id;
      delete account.id;
      return this.db.object('/accounts/' + id).update(account);
    } else {
      return this.db.list('/accounts/').push(account);
    }
  }
}
