import { Component } from '@angular/core';
// import { AdalService } from 'angular2-adal/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/account-list/account-list.html'
})
export class AccountList {

  constructor(public navCtrl: NavController/*,
              private adalService: AdalService*/) {
        // this.adalService.handleWindowCallback();
        // if (!this.adalService.userInfo.isAuthenticated) {
        //     this.adalService.login();
        // }
  }
}
