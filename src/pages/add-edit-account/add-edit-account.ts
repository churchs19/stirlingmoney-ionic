import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
      //TODO: Load account from data
    }
  }

  onSubmit() {
    console.log('submit changes');
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
