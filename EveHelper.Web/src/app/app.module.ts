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
import { OrdersComponent } from './wallet/orders/orders.component';
import { RedirectComponent } from './login/redirect/redirect.component';
import { InternalapiService } from './service/internal/internalapi.service';
import { JournalComponent } from './wallet/journal/journal.component';
import { PathsComponent } from './paths/paths.component';
import { MiningComponent } from './mining/mining.component';
import { FleetorganizerComponent } from './mining/fleetorganizer/fleetorganizer.component';
import { ClaimComponent } from './mining/fleetorganizer/claim/claim.component';
import { MiningLedgerComponent } from './mining/mining-ledger/mining-ledger.component';
import { CharacterSelecterGuard } from './guards/character-selecter.guard';
import { CharacterHomeComponent } from './home/character-home/character-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CallbackComponent,
    WalletComponent,
    AssetsComponent,
    CharacterComponent,
    TransactionsComponent,
    OrdersComponent,
    RedirectComponent,
    JournalComponent,
    PathsComponent,
    MiningComponent,
    FleetorganizerComponent,
    ClaimComponent,
    MiningLedgerComponent,
    CharacterHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, EveapiService, InternalapiService, CharacterSelecterGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
