import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AccountsPage } from '../pages/accounts/accounts';
import { BudgetsPage } from '../pages/budgets/budgets';
import { GoalsPage } from '../pages/goals/goals';
// import { CategoriesPage } from '../pages/categories/categories';
// import { AccountDetailsPage } from '../pages/account-details/account-details';
// import { TransactionDetailsPage } from '../pages/transaction-details/transaction-details';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AccountsPage;

  pages: Array<{title: string, component: any, icon: string, color: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accounts', component: AccountsPage, icon: 'book', color: 'primary' },
      { title: 'Budgets', component: BudgetsPage, icon: 'book', color: 'secondary' },
      { title: 'Goals', component: GoalsPage,  icon: 'book', color: 'danger' }
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
}
