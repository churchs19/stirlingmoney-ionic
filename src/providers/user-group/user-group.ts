import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFirestore } from 'angularfire2/firestore';

import { AuthenticationProvider } from '../authentication/authentication';
import { UserGroup } from '../../model/user-group';
import { User } from '../../model/user';

/*
  Generated class for the UserGroupProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserGroupProvider {

  constructor(private db: AngularFirestore) {
  }

  public getUserGroups(user: User): string[] {
    this.db.collection<UserGroup>('/user-groups');
    return [];
  }

  public insert(userGroup: UserGroup): Promise<UserGroup> {
    userGroup.id = this.db.createId();
    return this.db.doc<UserGroup>('user-groups/' + userGroup.id).ref.set({
      id: userGroup.id,
      members: userGroup.members
    }, {
      merge: true
    }).then(() => {
      return userGroup;
    });
  }
}
