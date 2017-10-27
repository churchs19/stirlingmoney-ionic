//Angular
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { TextMaskModule } from 'angular2-text-mask';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AccountDetailsPage } from '../pages/account-details/account-details';
import { AccountsPage } from '../pages/accounts/accounts';
import { AddEditAccountPage } from '../pages/add-edit-account/add-edit-account';
import { CategoriesPage } from '../pages/categories/categories';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { AccountsProvider } from '../providers/accounts/accounts';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { SettingsProvider } from '../providers/settings/settings';
import { UserGroupProvider } from '../providers/user-group/user-group';
import { MyApp } from './app.component';
import { FirebaseConfig } from './firebaseConfig';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SettingsPage,
    AccountsPage,
    AddEditAccountPage,
    CategoriesPage,
    AccountDetailsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    TextMaskModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
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
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    SettingsProvider,
    AccountsProvider,
    UserGroupProvider]
})
export class AppModule {}
