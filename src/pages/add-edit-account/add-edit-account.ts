import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  accountId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(navParams.get('mode')) {
      this.mode = navParams.get('mode');
    }
    if(navParams.get('accountId')) {
      this.accountId = navParams.get('accountId');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditAccountPage');
  }

}
