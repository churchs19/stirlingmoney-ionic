import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
