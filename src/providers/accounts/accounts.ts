import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';

import { IAccount } from '../../model/account';
import { IUserGroup } from '../../model/user-group';
import { AuthenticationProvider } from '../authentication/authentication';
import { IUser } from '../../model/user';

/*
  Generated class for the AccountsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AccountsProvider {
  constructor(private db: AngularFirestore, private authProvider: AuthenticationProvider) {
    this.authProvider.user().subscribe(user => {});
  }

  public list(): Observable<IAccount[]> {
    // return this.authProvider.user().subscribe(user => {
    // }).unsubscribe();
    return this.authProvider.user().switchMap<IUser, IAccount[]>((user, index) => {
      const userGroupDoc = this.db.doc<IUserGroup>(`user-groups/${user.userGroup}`);
      var list = userGroupDoc.collection<IAccount>(`accounts`);
      // list.snapshotChanges().map((val, index) => {
      //   console.log(
      //     JSON.stringify(
      //       val.map(it => {
      //         return it.payload.doc.data;
      //       })
      //     )
      //   );
      // });
      return list.valueChanges();
    });
  }

  public get(id: string): Observable<IAccount> {
    return this.authProvider.user().switchMap((user) => {
      return this.db.doc<IAccount>(`user-groups/${user.userGroup}/accounts/${id}`).valueChanges();
    });
  }

  public delete(id: string) {
    this.authProvider.user().map((user) => {
      return this.db.doc<IAccount>(`user-groups/${user.userGroup}/accounts/${id}`).delete();
    });
  }

  public upsert(item: IAccount): string {
    let id: string;
    if (!item.id) {
      id = this.db.createId();
    } else {
      id = item.id;
    }
    this.authProvider.user().subscribe((user) => {
      const userGroupDoc = this.db.doc<IUserGroup>(`user-groups/${user.userGroup}`);
      if(!item.id) {
        item.id = id;
        var accountDoc = userGroupDoc
          .collection(`accounts`)
          .doc(item.id);

        accountDoc
          .ref.set(item);
      } else {
        this.db
          .doc<IAccount>(`user-groups/${user.userGroup}/accounts/${item.id}`)
          .update(item);
      }
    });

    return id;
  }
}
