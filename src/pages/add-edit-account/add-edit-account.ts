import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Account } from '../../model/account';
import { AccountsProvider } from '../../providers/accounts/accounts';
import { AddEditAccountModel } from './add-edit-account-model';

/*
  Generated class for the AddEditAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-edit-account',
  templateUrl: 'add-edit-account.html'
})
export class AddEditAccountPage {
  mode: string = "Add";
  account: Account = new Account('');

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private accountsProvider: AccountsProvider) {
    if (navParams.get('mode')) {
      this.mode = navParams.get('mode');
    }
    if (navParams.get('account')) {
      this.account = <Account>navParams.get('account');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditAccountPage');
  }

  onSubmit() {
    this.accountsProvider.upsert(this.account).then((result) => {
      this.navCtrl.pop();
    });
  }
}
