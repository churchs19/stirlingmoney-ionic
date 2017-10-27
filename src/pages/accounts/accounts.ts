import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, List, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { IAccount } from '../../model/account';
import { AccountsProvider } from '../../providers/accounts/accounts';
import { AccountDetailsPage } from '../account-details/account-details';
import { AddEditAccountPage } from '../add-edit-account/add-edit-account';

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
  @ViewChild(List) list: List;
  accounts: Observable<IAccount[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              private accountsProvider: AccountsProvider) {
    this.accounts = this.accountsProvider.list();

    this.accounts.subscribe(item => {
      console.log(JSON.stringify(item));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  accountDetails(account: IAccount) {
    console.log(JSON.stringify(account));
    this.navCtrl.push(AccountDetailsPage, {
      account: account
    });
  }

  addAccount() {
    this.list.closeSlidingItems();
    this.navCtrl.push(AddEditAccountPage, {
      mode: 'Add'
    });
  }

  editAccount(account: IAccount) {
    this.list.closeSlidingItems();
    this.navCtrl.push(AddEditAccountPage, {
      mode: 'Edit',
      account: account
    });
  }

  deleteAccount(account: IAccount) {
    let _account = account;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete account?',
      buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log(_account.id);
            this.accountsProvider.delete(_account.id);
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            this.list.closeSlidingItems();
          }
        }
      ]
    });

    actionSheet.present();

  }
}
