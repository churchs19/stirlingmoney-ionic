import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TextMaskModule } from 'angular2-text-mask';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AccountsPage } from '../pages/accounts/accounts';
import { AddEditAccountPage } from '../pages/add-edit-account/add-edit-account';
// import { BudgetsPage } from '../pages/budgets/budgets';
// import { GoalsPage } from '../pages/goals/goals';
import { CategoriesPage } from '../pages/categories/categories';
import { AccountDetailsPage } from '../pages/account-details/account-details';
import { TransactionDetailsPage } from '../pages/transaction-details/transaction-details';
@NgModule({
  declarations: [
    MyApp,
    AccountsPage,
    AddEditAccountPage,
    // BudgetsPage,
    // GoalsPage,
    CategoriesPage,
    AccountDetailsPage,
    TransactionDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    TextMaskModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountsPage,
    AddEditAccountPage,
    // BudgetsPage,
    // GoalsPage,
    CategoriesPage,
    AccountDetailsPage,
    TransactionDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
