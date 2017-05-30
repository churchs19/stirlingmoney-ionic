import { Injectable } from '@angular/core';
import 'rxjs';
import 'rxjs/add/operator/map';

import { } from 'angularfire2';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable,
} from 'angularfire2/database';
import { AuthenticationProvider } from '../authentication/authentication';

/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TransactionsProvider {

  constructor(private db: AngularFireDatabase, private authProvider: AuthenticationProvider) {

  }

  public list(accountId: string): FirebaseListObservable<any> {
    var list: FirebaseListObservable<any> = this.db.list('/transactions/' + this.authProvider.uid() + '/' + accountId);
    return list;
  }

  public get(accountId: string, id: string): FirebaseObjectObservable<any> {
    return this.db.object('/transactions/' + this.authProvider.uid() + '/' + accountId + '/' + id);
  }

  public delete(accountId: string, id: string) {
    return this.db.object('/transactions/' + this.authProvider.uid() + '/' + accountId + '/' + id).remove();
  }

  public upsert(accountId: string, transaction: any): any {
    if(transaction.id) {
      var id = transaction.id;
      delete transaction.id;
      return this.db.object('/transactions/' + this.authProvider.uid() + '/' + accountId +  '/' + id).update(transaction);
    } else {
      return this.db.list('/transactions/'  + this.authProvider.uid() + '/' + accountId + '/').push(transaction);
    }
  }
}
