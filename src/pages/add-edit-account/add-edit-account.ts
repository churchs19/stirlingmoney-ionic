import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IAccount } from '../../model/account';
import { AccountsProvider } from '../../providers/accounts/accounts';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

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
  account: IAccount;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private accountsProvider: AccountsProvider,
    private authProvider: AuthenticationProvider
  ) {
    if (navParams.get('mode')) {
      this.mode = navParams.get('mode');
    }
    if (navParams.get('account')) {
      this.account = <IAccount>navParams.get('account');
    } else {
      this.account = {
        name: '',
        initialBalance: 0,
        postedBalance: 0,
        availableBalance: 0
      };
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
