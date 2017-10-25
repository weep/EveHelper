import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './service/auth.service';
import { EveapiService } from './service/eveapi.service';
import { HttpClientModule } from '@angular/common/http';
import { CallbackComponent } from './login/callback/callback.component';
import { WalletComponent } from './wallet/wallet.component';
import { AssetsComponent } from './assets/assets.component';
import { CharacterComponent } from './character/character.component';
import { TransactionsComponent } from './wallet/transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CallbackComponent,
    WalletComponent,
    AssetsComponent,
    CharacterComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, EveapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
