import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { IUser } from '../../model/user';
import { IUserGroup } from '../../model/user-group';

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
