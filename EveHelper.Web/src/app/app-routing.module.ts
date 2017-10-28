import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './login/callback/callback.component';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionsComponent } from './wallet/transactions/transactions.component';
import { OrdersComponent } from './wallet/orders/orders.component';
import { RedirectComponent } from './login/redirect/redirect.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'login/redirect',
  component: RedirectComponent
}, {
  path: 'auth/callback',
  component: CallbackComponent
}, {
  path: 'wallet',
  component: WalletComponent,
  children: [
    {
      path: 'trans',
      component: TransactionsComponent
    },
    {
      path: 'orders',
      component: OrdersComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
