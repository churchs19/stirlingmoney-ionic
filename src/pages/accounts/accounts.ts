import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams,
  ActionSheetController
} from 'ionic-angular';
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
  accounts: Array < AccountSummary > ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.accounts = [{
        id: '1',
        name: 'Account 1',
        availableBalance: 123.15,
        postedBalance: 150.00
      },
      {
        id: '2',
        name: 'Account 2',
        availableBalance: -123.15,
        postedBalance: -150.00
      },
      {
        id: '3',
        name: 'Account 3',
        availableBalance: 123.15,
        postedBalance: 150.00
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  accountDetails(account: AccountSummary) {
    console.log(JSON.stringify(account));
    this.navCtrl.push(AccountDetailsPage);
  }

  addAccount() {
    this.navCtrl.push(AddEditAccountPage, {
      mode: 'Add'
    })
  }

  editAccount(account: AccountSummary) {
    this.navCtrl.push(AddEditAccountPage, {
      mode: 'Edit'
    })
  }

  deleteAccount(account: AccountSummary) {
    console.log('in deleteAccount');
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete account?',
      buttons: [{
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();

  }
}

interface AccountSummary {
  id: string,
    name: string,
    availableBalance: number,
    postedBalance: number,
    icon ? : string
}
