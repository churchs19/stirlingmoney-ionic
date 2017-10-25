import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { AuthenticationProvider } from '../providers/authentication/authentication';

import { AccountsPage } from '../pages/accounts/accounts';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  loggedIn: boolean = false;
  displayName: string;
  photoURL: string;

  pages: Array<any>;

  constructor(public platform: Platform, afAuth: AngularFireAuth, private authProvider: AuthenticationProvider) {
    this.initializeApp();

    afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = AccountsPage;
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
        this.loggedIn = true;
      } else {
        this.rootPage = LoginPage;
        this.loggedIn = false;
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accounts', component: AccountsPage, icon: 'book', color: 'light'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
//      StatusBar.styleDefault();
//      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.authProvider.logout();
//    window.location.reload(true);
  }

  login() {
    this.openPage({component: LoginPage});
  }
}
