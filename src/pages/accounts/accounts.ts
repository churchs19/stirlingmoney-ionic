import {
  Component,
  ViewChild
} from '@angular/core';
import {
  NavController,
  NavParams,
  ActionSheetController,
  List
} from 'ionic-angular';
import { AccountsProvider } from '../../providers/accounts/accounts';
import {
  AccountDetailsPage
} from '../account-details/account-details';
import {
  AddEditAccountPage
} from '../add-edit-account/add-edit-account';

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
  accounts: any;
//  accounts: Array<Account> ;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              private accountsProvider: AccountsProvider) {
    this.accounts = this.accountsProvider.list();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  accountDetails(account: any) {
    console.log(JSON.stringify(account));
    this.navCtrl.push(AccountDetailsPage);
  }

  addAccount() {
    this.list.closeSlidingItems();
    this.navCtrl.push(AddEditAccountPage, {
      mode: 'Add'
    });
  }

  editAccount(account: any) {
    this.list.closeSlidingItems();
    this.navCtrl.push(AddEditAccountPage, {
      mode: 'Edit',
      accountId: account.$key
    });
  }

  deleteAccount(account: any) {
    let _account = account;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete account?',
      buttons: [{
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log(_account.$key);
            this.accountsProvider.delete(_account.$key);
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.list.closeSlidingItems();
          }
        }
      ]
    });

    actionSheet.present();

  }
}
