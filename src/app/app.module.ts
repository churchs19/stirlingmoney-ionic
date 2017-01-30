import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AccountsPage } from '../pages/accounts/accounts';
import { BudgetsPage } from '../pages/budgets/budgets';
import { GoalsPage } from '../pages/goals/goals';
import { CategoriesPage } from '../pages/categories/categories';
import { AccountDetailsPage } from '../pages/account-details/account-details';
import { TransactionDetailsPage } from '../pages/transaction-details/transaction-details';
@NgModule({
  declarations: [
    MyApp,
    AccountsPage,
    BudgetsPage,
    GoalsPage,
    CategoriesPage,
    AccountDetailsPage,
    TransactionDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountsPage,
    BudgetsPage,
    GoalsPage,
    CategoriesPage,
    AccountDetailsPage,
    TransactionDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
