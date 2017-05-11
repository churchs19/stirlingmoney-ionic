import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';

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

  pages: Array<any>;

  constructor(public platform: Platform, afAuth: AngularFireAuth, private authProvider: AuthenticationProvider) {
    this.initializeApp();

    /*const authObserver = */afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = AccountsPage;
        this.loggedIn = true;
      } else {
        this.rootPage = LoginPage;
        this.loggedIn = false;
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accounts', component: AccountsPage, icon: 'book', color: 'primary'}
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
    window.location.reload(true);
  }

  login() {
    this.openPage({component: LoginPage});
  }
}
