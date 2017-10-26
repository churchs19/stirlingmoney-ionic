import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

import { AuthenticationProvider } from '../authentication/authentication';
import { IAccount } from '../../model/account';
import { IUserGroup } from '../../model/user-group';

/*
  Generated class for the AccountsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccountsProvider {

  constructor(private db: AngularFirestore, private authProvider: AuthenticationProvider) {

  }

  public list(): Observable<IAccount[]> {
    var list = this.db.collection<IAccount>(`user-groups/${this.authProvider.userGroup}/Accounts`);
    return list.valueChanges();
  }

  public get(id: string): Observable<IAccount> {
    return this.db.doc<IAccount>(`user-groups/${this.authProvider.userGroup}/accounts${id}`)
      .valueChanges();
  }

  public delete(id: string): Promise<void> {
    return this.db.doc<IAccount>(`user-groups/${this.authProvider.userGroup}/accounts/${id}`)
      .delete();
  }

  public upsert(item: IAccount): Promise<IAccount> {
    if(!item.id) {
      const id = this.db.createId();
      item.id = id;
      return this.db.doc<IUserGroup>(`user-groups/${this.authProvider.userGroup}`)
        .collection<IAccount>('accounts')
        .ref
        .doc(`${item.id}`)
        .set(item)
        .then(() => {
          return item;
        });
    } else {
      return this.db.doc<IAccount>(`user-groups/${this.authProvider.userGroup}/accounts/${item.id}`)
        .update(item)
        .then(() => {
          return item;
        });
    }
  }
}
