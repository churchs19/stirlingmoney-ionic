import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

import { AuthenticationProvider } from '../authentication/authentication';
import { Account } from '../../model/account';

/*
  Generated class for the AccountsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccountsProvider {

  constructor(private db: AngularFirestore, private authProvider: AuthenticationProvider) {

  }

  public list(): Observable<Account[]> {
    var list = this.db.collection<Account>('/accounts');
    return list.valueChanges();
  }

  public get(id: string): Observable<Account> {
    return this.db.doc<Account>('/accounts/' + id)
      .valueChanges();
  }

  public delete(id: string): Promise<void> {
    return this.db.doc<Account>('/accounts/' + id)
      .delete();
  }

  public upsert(item: Account): Promise<Account> {
    if(!item.id) {
      const id = this.db.createId();
      item.id = id;
      return this.db.collection<Account>('/accounts')
        .add(item)
        .then(() => {
          return item;
        });
    } else {
      return this.db.doc<Account>('/accounts/' + item.id)
        .update(item)
        .then(() => {
          return item;
        });
    }
  }
}
