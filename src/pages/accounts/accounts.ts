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
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database';
import { Account } from '../../model/account';
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
  accounts: FirebaseListObservable<any>;
//  accounts: Array<Account> ;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              db: AngularFireDatabase) {
    // this.accounts = [{
    //     id: '1',
    //     name: 'Account 1',
    //     availableBalance: 123.15,
    //     postedBalance: 150.00
    //   },
    //   {
    //     id: '2',
    //     name: 'Account 2',
    //     availableBalance: -123.15,
    //     postedBalance: -150.00
    //   },
    //   {
    //     id: '3',
    //     name: 'Account 3',
    //     availableBalance: 123.15,
    //     postedBalance: 150.00
    //   }
    // ]
    this.accounts = db.list('/accounts');
//    this.accounts.push(new Account('Test', 100, 100, 100));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  accountDetails(account: Account) {
    console.log(JSON.stringify(account));
    this.navCtrl.push(AccountDetailsPage);
  }

  addAccount() {
    this.list.closeSlidingItems();
    this.navCtrl.push(AddEditAccountPage, {
      mode: 'Add'
    })
  }

  editAccount(account: Account) {
    this.list.closeSlidingItems();
    this.navCtrl.push(AddEditAccountPage, {
      mode: 'Edit'
    })
  }

  deleteAccount(account: Account) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete account?',
      buttons: [{
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.list.closeSlidingItems();
          }
        }
      ]
    });

    actionSheet.present();

  }
}
