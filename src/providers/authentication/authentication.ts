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
import { IUser } from '../../model/user';
import { IUserGroup } from '../../model/user-group';

export enum AuthenticationType {
  Google,
  Twitter
}

@Injectable()
export class AuthenticationProvider {

  private fireAuth: firebase.User;
  private usersCollection: AngularFirestoreCollection<IUser>;
  private _userGroup: string;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFirestore,
    public userGroupProvider: UserGroupProvider
  ) {
    this.usersCollection = this.db.collection<IUser>('users');
    afAuth.authState.subscribe(user => {
      if (user) {
        this.fireAuth = user;
        const userDoc = this.db.doc<IUser>('users/' + user.uid);
        userDoc.valueChanges().subscribe(value => {
          if(!value) {
            userDoc.ref.set({
              uid: user.uid,
              email: user.email
            }, {
              merge: true
            });
          } else {
            if(!value.userGroup) {
              this.createUserGroup(userDoc.ref);
            } else {
              this._userGroup = value.userGroup;
            }
          }
        });
      }
    });
  }

  private createUserGroup(userDocRef: firebase.firestore.DocumentReference) {
    const userGroup: IUserGroup = { members: [] }
    userGroup.members.push({ uid: this.uid(), email: this.email()});
    this.userGroupProvider.insert(userGroup).then((insertedGroup) => {
      userDocRef.set({
        userGroup: insertedGroup.id
      }, {
        merge: true
      });
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
