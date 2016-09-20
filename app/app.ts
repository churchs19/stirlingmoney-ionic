import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { AdalService } from './lib/angular2-adal/core';
import { SecretService } from './services/secret.service';

import { AccountList } from './pages/account-list/account-list';
import { Page2 } from './pages/page2/page2';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AccountList;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              private adalService: AdalService,
              private secretService: SecretService) {

    this.adalService.init(this.secretService.adalConfig);

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accounts', component: AccountList },
      { title: 'Page dos', component: Page2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
