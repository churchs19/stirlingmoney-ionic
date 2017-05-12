import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  model: AddEditAccountModel = new AddEditAccountModel('',0);

  constructor(public navCtrl: NavController, public navParams: NavParams, private accountsProvider: AccountsProvider) {
    if(navParams.get('mode')) {
      this.mode = navParams.get('mode');
    }
    if(navParams.get('accountId')) {
      this.model.accountId = navParams.get('accountId');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditAccountPage');
    if(this.model.accountId) {
      this.accountsProvider.get(this.model.accountId).subscribe(it => {
        this.model.accountName = it.name;
        this.model.initialBalance = it.initialBalance;
      });
    }
  }

  onSubmit() {
    var account = { name: this.model.accountName, initialBalance: this.model.initialBalance };
    if(this.model.accountId) {
      account['id'] = this.model.accountId;
    } else {
      account['availableBalance'] = this.model.initialBalance;
      account['postedBalance'] = this.model.initialBalance;
    }
    this.accountsProvider.upsert(account).then(() => {
      this.navCtrl.pop();
    });
  }
}
