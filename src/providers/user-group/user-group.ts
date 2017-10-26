import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFirestore } from 'angularfire2/firestore';

import { AuthenticationProvider } from '../authentication/authentication';
import { IUserGroup } from '../../model/user-group';
import { IUser } from '../../model/user';

/*
  Generated class for the UserGroupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserGroupProvider {

  constructor(private db: AngularFirestore) {
  }

  public getUserGroups(user: IUser): string[] {
    this.db.collection<IUserGroup>('/user-groups');
    return [];
  }

  public insert(userGroup: IUserGroup): Promise<IUserGroup> {
    userGroup.id = this.db.createId();
    return this.db.doc<IUserGroup>('user-groups/' + userGroup.id).ref.set(
      userGroup, {
      merge: true
    }).then(() => {
      return userGroup;
    });
  }
}
