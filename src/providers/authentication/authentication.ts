import {
  Injectable
} from '@angular/core';
import {
  AngularFireAuth
} from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { UserGroupProvider } from '../user-group/user-group';
import { User } from '../../model/user';
import { UserGroup } from '../../model/user-group';

export enum AuthenticationType {
  Google,
  Twitter
}

@Injectable()
export class AuthenticationProvider {

  private fireAuth: firebase.User;
  private usersCollection: AngularFirestoreCollection<User>;
  private _userGroup: string;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFirestore,
    public userGroupProvider: UserGroupProvider
  ) {
    this.usersCollection = this.db.collection<User>('users');
    afAuth.authState.subscribe(user => {
      if (user) {
        this.fireAuth = user;
        const userDocRef = this.db.doc<User>('users/' + user.uid).ref;
        userDocRef.set({
          uid: user.uid,
          email: user.email
        }, {
          merge: true
        }).then(() => {
          //get user groups for user

          //if no groups, create group
          const userGroup = new UserGroup();
          userGroup.members.push({ uid: user.uid, email: user.email});
          this.userGroupProvider.insert(userGroup).then((insertedGroup) => {
            userDocRef.set({
              userGroup: insertedGroup.id
            }, {
              merge: true
            });
          });
        });
      }
    });
  }

  public uid(): string {
    if (this.fireAuth) {
      return this.fireAuth.uid;
    }
    return null;
  }

  public displayName(): string {
    if (this.fireAuth) {
      return this.fireAuth.displayName;
    }
    return null;
  }

  public photoURL(): string {
    if (this.fireAuth) {
      return this.fireAuth.photoURL;
    }
    return null;
  }

  public email(): string {
    if (this.fireAuth) {
      return this.fireAuth.email;
    }
    return null;
  }

  public userGroup(): string {
    return this._userGroup;
  }

  public login(type: AuthenticationType = AuthenticationType.Google) {
    var provider: any;
    switch (type) {
      // case AuthenticationType.Twitter:
      //   provider = new firebase.auth.TwitterAuthProvider();
      //   break;
      case AuthenticationType.Google:
      default:
        provider = new firebase.auth.GoogleAuthProvider();
        break;
    }
    this.afAuth.auth.signInWithRedirect(provider);
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
