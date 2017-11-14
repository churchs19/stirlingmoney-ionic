import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { IUser } from '../../model/user';
import { IUserGroup } from '../../model/user-group';
import { UserGroupProvider } from '../user-group/user-group';

export enum AuthenticationType {
  Google,
  Twitter,
}

@Injectable()
export class AuthenticationProvider {
  private usersCollection: AngularFirestoreCollection<IUser>;
  private currentUserDocument: AngularFirestoreDocument<IUser>;
  private userObject: IUser;

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore, public userGroupProvider: UserGroupProvider) {
    this.usersCollection = this.db.collection<IUser>('users');
    afAuth.authState.subscribe(user => {
      if (user) {
        const fireAuth = user;
        this.currentUserDocument = this.db.doc<IUser>('users/' + user.uid);
        this.currentUserDocument.valueChanges().subscribe(value => {
          if (!value) {
            this.currentUserDocument.ref.set(
              {
                uid: user.uid,
                email: user.email,
                displayName: fireAuth.displayName,
                photoURL: fireAuth.photoURL,
              },
              {
                merge: true,
              }
            );
          } else {
            if (!value.userGroup) {
              this.createUserGroup(this.currentUserDocument.ref, fireAuth.uid, fireAuth.email);
            }
          }
        });
      }
    });
  }

  public user(): Observable<IUser> {
    if(this.userObject) {
      return Observable.of(this.userObject);
    } else {
      return this.currentUserDocument.valueChanges();
    }
  }

  private createUserGroup(userDocRef: firebase.firestore.DocumentReference, uid: string, email: string): Promise<string> {
    const userGroup: IUserGroup = { members: [] };
    userGroup.members.push({ uid: uid, email: email });
    return this.userGroupProvider.insert(userGroup).then(insertedGroup => {
      return userDocRef
        .set(
          {
            userGroup: insertedGroup.id,
          },
          {
            merge: true,
          }
        )
        .then(() => {
          return insertedGroup.id;
        });
    });
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
