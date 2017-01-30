import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AccountDetailsPage } from '../account-details/account-details';

/*
  Generated class for the Accounts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  accountDetails() {
    this.navCtrl.push(AccountDetailsPage);
  }
}
