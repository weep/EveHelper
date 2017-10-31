import { Injectable } from '@angular/core';
import { AccessToken } from '../models/access-token';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from '../models/character';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {
  retUrl: string;
  private scopes: string = "publicData esi-calendar.respond_calendar_events.v1 esi-calendar.read_calendar_events.v1 esi-location.read_location.v1 esi-location.read_ship_type.v1 esi-mail.organize_mail.v1 esi-mail.read_mail.v1 esi-mail.send_mail.v1 esi-skills.read_skills.v1 esi-skills.read_skillqueue.v1 esi-wallet.read_character_wallet.v1 esi-wallet.read_corporation_wallet.v1 esi-search.search_structures.v1 esi-clones.read_clones.v1 esi-characters.read_contacts.v1 esi-universe.read_structures.v1 esi-bookmarks.read_character_bookmarks.v1 esi-killmails.read_killmails.v1 esi-corporations.read_corporation_membership.v1 esi-assets.read_assets.v1 esi-planets.manage_planets.v1 esi-fleets.read_fleet.v1 esi-ui.open_window.v1 esi-fittings.read_fittings.v1 esi-markets.structure_markets.v1 esi-corporations.read_structures.v1 esi-characters.read_loyalty.v1 esi-characters.read_opportunities.v1 esi-characters.read_chat_channels.v1 esi-characters.read_medals.v1 esi-characters.read_standings.v1 esi-characters.read_agents_research.v1 esi-industry.read_character_jobs.v1 esi-markets.read_character_orders.v1 esi-characters.read_blueprints.v1 esi-characters.read_corporation_roles.v1 esi-location.read_online.v1 esi-contracts.read_character_contracts.v1 esi-clones.read_implants.v1 esi-characters.read_fatigue.v1 esi-killmails.read_corporation_killmails.v1 esi-corporations.track_members.v1 esi-wallet.read_corporation_wallets.v1 esi-characters.read_notifications.v1 esi-corporations.read_divisions.v1 esi-corporations.read_contacts.v1 esi-assets.read_corporation_assets.v1 esi-corporations.read_titles.v1 esi-corporations.read_blueprints.v1 esi-bookmarks.read_corporation_bookmarks.v1 esi-contracts.read_corporation_contracts.v1 esi-corporations.read_standings.v1 esi-corporations.read_starbases.v1 esi-industry.read_corporation_jobs.v1 esi-markets.read_corporation_orders.v1 esi-corporations.read_container_logs.v1 esi-industry.read_character_mining.v1 esi-industry.read_corporation_mining.v1";
  private clientId: string = "7a9cf164e37e42f794d4ed0fba8a05d9";
  private callbackUrl: string = "http://localhost:4200/auth/callback";
  private loginUrl: string = "login.eveonline.com";
  private responseType: string = "code";

  private refreshInterval;
  private _character: Character;
  private characterLoading: boolean = true;

  private lastRefresh: Date;
  private nextRefresh: Date;
  public refreshCountdown: number;

  constructor(private http: HttpClient, private router: Router) {
    console.log("AuthService Constructor");

    //this.refreshInterval = setInterval(() => this.refresh(), 10 * 1000 * 60);
    setInterval(() => this.tickDown(), 100);
    this.refresh();

    this.lastRefresh = new Date();
    this.nextRefresh = new Date();
    this.nextRefresh.setMinutes(this.lastRefresh.getMinutes() + 10);
  }

  private tickDown() {
    var now = new Date();
    this.refreshCountdown = Math.round((this.nextRefresh.getTime() - now.getTime()) / 1000);
    //console.log(this.refreshCountdown);
    if (this.refreshCountdown < 0)
      this.refresh();
  }

  authorize() {
    console.log(this.scopes);
    var state = this.guid();
    window.localStorage.setItem("login_state", state);
    var completeLoginUrl = `https://${this.loginUrl}/oauth/authorize?response_type=${this.responseType}&redirect_uri=${this.callbackUrl}&client_id=${this.clientId}&scope=${this.scopes}&state=${state}`;
    window.location.href = completeLoginUrl;
  }

  guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  private refresh() {
    if (this.accessToken != null) {
      console.log("Refreshing token...");

      this.lastRefresh = new Date();
      this.nextRefresh = new Date();
      this.nextRefresh.setMinutes(this.lastRefresh.getMinutes() + 10);

      return this.http.post<AccessToken>("http://localhost:4201/api/token", {
        "refreshToken": this.accessToken.refresh_token,
      }).map(token => {
        this.setAccessToken(token);
        this.characterLoading = false;
        return token
      }).subscribe();
    }
  }

  logout() {
    this.setAccessToken(null);
  }

  token(authCode: string): Observable<AccessToken> {
    return this.http.post<AccessToken>("http://localhost:4201/api/token", {
      "code": authCode
    }).map(token => {
      this.setAccessToken(token);
      return token
    });
  }

  isAuthorized() {
    let token = this.accessToken
    return token != null;
  }

  private setAccessToken(token: AccessToken) {
    if (token == null) {
      window.localStorage.removeItem("access_token");
    }
    else {
      window.localStorage.setItem("access_token", JSON.stringify(token));
    }
  }

  get accessToken(): AccessToken {
    return JSON.parse(window.localStorage.getItem("access_token"));
  }

  get characterLoaded(): boolean {
    return this._character != null
  }

  get character(): Character {
    if (this.characterLoaded)
      return this._character;
    this._character = JSON.parse(window.localStorage.getItem("character"));
  }

  public loadCharacter(): Observable<Character> {
    return this.http.get<Character>("http://localhost:4201/oauth/verify", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.accessToken.access_token
      })
    }).map((char: Character) => {
      console.log(char);
      this._character = char;
      window.localStorage.setItem("character", JSON.stringify(char));
      return char;
    });
  }
}
