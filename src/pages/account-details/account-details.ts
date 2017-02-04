import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, List, ActionSheetController } from 'ionic-angular';
import { AccountDetailsModel } from './account-details-model';

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
  model: AccountDetailsModel;
  @ViewChild(List) list: List;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
    this.model=new AccountDetailsModel(
      'accountId1',
      'Checking',
      123.50,
      150,
      []
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountDetailsPage');
  }

  filterList() {

  }

  addTransaction() {
    this.list.closeSlidingItems();
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
          text: 'Withdraw',
          handler: () => {
            console.log('Withdraw clicked');
          }
        },
        {
          text: 'Write Check',
          handler: () => {
            console.log('Write Check clicked');
          }
        },
        {
          text: 'Deposit',
          handler: () => {
            console.log('Deposit clicked');
          }
        },
        {
          text: 'Transfer',
          handler: () => {
            console.log('Transfer clicked');
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
