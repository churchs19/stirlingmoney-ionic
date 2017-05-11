import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

export enum AuthenticationType {
  Google,
  Twitter
}

@Injectable()
export class AuthenticationProvider {

    fireAuth: any;

    constructor(public afAuth: AngularFireAuth) {
        afAuth.authState.subscribe( user => {
            if (user) {
                this.fireAuth = user.getToken();
                console.log(JSON.stringify(user));
            }
        });
    }

    public login(type: AuthenticationType = AuthenticationType.Google) {
      var provider: any;
      switch(type) {
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