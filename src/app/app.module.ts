//Angular
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

//Ionic
import { TextMaskModule } from 'angular2-text-mask';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

//AngularFire 2
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Firebase Settings
import { FirebaseConfig } from './firebaseConfig';

//App
import { MyApp } from './app.component';

//Pages
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { AccountsPage } from '../pages/accounts/accounts';
import { AddEditAccountPage } from '../pages/add-edit-account/add-edit-account';
import { CategoriesPage } from '../pages/categories/categories';
import { AccountDetailsPage } from '../pages/account-details/account-details';
import { TransactionDetailsPage } from '../pages/transaction-details/transaction-details';

//Providers
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { SettingsProvider } from '../providers/settings/settings';
import { AccountsProvider } from '../providers/accounts/accounts';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SettingsPage,
    AccountsPage,
    AddEditAccountPage,
    CategoriesPage,
    AccountDetailsPage,
    TransactionDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    TextMaskModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SettingsPage,
    AccountsPage,
    AddEditAccountPage,
    CategoriesPage,
    AccountDetailsPage,
    TransactionDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    SettingsProvider,
    AccountsProvider]
})
export class AppModule {}
