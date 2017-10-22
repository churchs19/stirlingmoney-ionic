import {
  Component,
  ViewChild
} from '@angular/core';
import {
  NavController,
  NavParams,
  List,
  ActionSheetController,
  FabContainer
} from 'ionic-angular';
import * as Enumerable from 'linq';
import * as moment from 'moment';
import { Account } from '../../model/account';
import {
  AccountDetailsModel
} from './account-details-model';
import {
  AccountTransactionDateModel
} from './account-transaction-date-model';
import {
  AccountTransactionModel
} from './account-transaction-model';
import {
  AccountsProvider
} from '../../providers/accounts/accounts';
import {
  TransactionsProvider
} from '../../providers/transactions/transactions';


/*
  Generated class for the AccountDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account-details',
  templateUrl: 'account-details.html'
})
export class AccountDetailsPage {
  @ViewChild(List) list: List;
  model: AccountDetailsModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private accountsProvider: AccountsProvider,
    private transactionsProvider: TransactionsProvider
  ) {
    this.model = new AccountDetailsModel();
    if (navParams.get('accountId')) {
      this.model.accountId = navParams.get('accountId');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountDetailsPage');
    this.loadData();
  }

  private loadData() {
    // if (this.model.accountId) {
    //   this.accountsProvider.get(this.model.accountId).valueChanges<Account>().subscribe(it => {
    //     this.model.accountName = it.name;
    //     this.model.postedBalance = it.postedBalance;
    //     this.model.availableBalance = it.availableBalance;
    //   });
    //   this.transactionsProvider.list(this.model.accountId).valueChanges<any>().subscribe(it => {
    //     var transactionGroups = Enumerable.from<any>(it).groupBy(transaction => moment(transaction.date).format('YYYY-MM-DD'));
    //     this.model.transactionDates.splice(0, this.model.transactionDates.length);
    //     transactionGroups.forEach(it => {
    //       var transactions = it.select(it => new AccountTransactionModel(it.$key, it.date, it.location, it.amount, it.posted)).toArray();
    //       this.model.transactionDates.push(new AccountTransactionDateModel(moment(it.key(), 'YYYY-MM-DD').toDate(), transactions));
    //     });
    //   });
    // }
  }

  filterList() {

  }

  withdraw(fab: FabContainer) {
    console.log('Withdraw clicked');
    fab.close();
    // this.transactionsProvider.upsert(this.model.accountId, {
    //   date: moment().toDate(),
    //   location: 'Test Transaction',
    //   amount: -20,
    //   posted: false
    // });
  }

  deleteTransaction(transaction: AccountTransactionModel) {
    let _transaction = transaction;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete transaction?',
      buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            // console.log(transaction.transactionId);
            // this.transactionsProvider.delete(this.model.accountId, _transaction.transactionId).then(() => {
            //   this.loadData();
            // });
            // this.list.closeSlidingItems();
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

  formatDate(date: Date): string {
    return moment(date).format('LL');
  }
}
