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

import {
  User
} from '../../model/user';

export enum AuthenticationType {
  Google,
  Twitter
}

@Injectable()
export class AuthenticationProvider {

  private fireAuth: firebase.User;
  private usersCollection: AngularFirestoreCollection < User > ;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFirestore
  ) {
    this.usersCollection = this.db.collection<User>('users');
    afAuth.authState.subscribe(user => {
      if (user) {
        this.db.doc<User>('users/' + user.uid).ref.set({
          uid: user.uid
        }, {
          merge: true
        }).then(() => {
          this.fireAuth = user;
          console.log(JSON.stringify(user));
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

  public login(type: AuthenticationType = AuthenticationType.Google) {
    var provider: any;
    switch (type) {
      case AuthenticationType.Twitter:
        provider = new firebase.auth.TwitterAuthProvider();
        break;
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
