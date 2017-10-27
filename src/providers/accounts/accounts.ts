import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';

import { IAccount } from '../../model/account';
import { IUserGroup } from '../../model/user-group';
import { AuthenticationProvider } from '../authentication/authentication';

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
    const userGroupDoc = this.db.doc<IUserGroup>(`user-groups/${this.authProvider.userGroup()}`);
    var list = userGroupDoc.collection<IAccount>(`accounts`);
    list.snapshotChanges().map((val, index) => {
      console.log(JSON.stringify(val.map(it => {
        return it.payload.doc.data;
      })));
    });
    return list.valueChanges();
  }

  public get(id: string): Observable<IAccount> {
    return this.db.doc<IAccount>(`user-groups/${this.authProvider.userGroup()}/accounts/${id}`).valueChanges();
  }

  public delete(id: string): Promise<void> {
    return this.db.doc<IAccount>(`user-groups/${this.authProvider.userGroup()}/accounts/${id}`)
      .delete();
  }

  public upsert(item: IAccount): Promise<IAccount> {
    const userGroupDoc = this.db.doc<IUserGroup>(`user-groups/${this.authProvider.userGroup()}`);
    if(!item.id) {
      const id = this.db.createId();
      item.id = id;

      return userGroupDoc.collection(`accounts`)
        .doc(item.id)
        .ref
        .set(item)
        .then(() => {
          return item;
        });
    } else {
      return this.db.doc<IAccount>(`user-groups/${this.authProvider.userGroup()}/accounts/${item.id}`)
        .update(item)
        .then(() => {
          return item;
        });
    }
  }
}
