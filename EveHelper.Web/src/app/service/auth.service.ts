import { Injectable } from '@angular/core';
import { AccessToken } from '../models/access-token';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Character } from '../models/character';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {
  private version: string = "0.1";

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
    if (window.localStorage.getItem("version") != this.version) {
      window.localStorage.clear();
      window.localStorage.setItem("version", this.version);
    }

    console.log("AuthService Constructor");

    //this.refreshInterval = setInterval(() => this.refresh(), 10 * 1000 * 60);

    //this.lastRefresh = new Date();
    //this.nextRefresh = new Date();
    //
    //setInterval(() => this.tickDown(), 10000);
    //this.refresh();
    //
    //this.nextRefresh.setMinutes(this.lastRefresh.getMinutes() + 10);
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
      this.forceRefresh();
    }
  }

  public forceRefresh(){
    console.log("Refreshing token...");

    this.lastRefresh = new Date();
    this.nextRefresh = new Date();
    this.nextRefresh.setMinutes(this.lastRefresh.getMinutes() + 10);

    return this.http.post<AccessToken>("http://localhost:4201/api/token", {
      "refreshToken": this.refreshToken,
    }).map(token => {
      this._character.Token = token;
      this.characterLoading = false;
      return token
    }).subscribe();
  }

  token(authCode: string): Observable<AccessToken> {
    return this.http.post<AccessToken>("http://localhost:4201/api/token", {
      "code": authCode
    }).map(token => {
      this._character = new Character();
      this.character.Token = token;
      return token
    });
  }

  get characterSelected() {
    try {
      return this._character != null;
    }
    catch (ex) {
      return false;
    }
  }

  get accessToken(): string {
    return this.character.Token.access_token;
  }

  get refreshToken(): string {
    return this.character.Token.access_token;
  }

  get characterLoaded(): boolean {
    return this._character != null
  }

  get character(): Character {
    if (this.characterLoaded)
      return this._character;
    this._character = this.characters.find(char => {
      let selectedChar = window.localStorage.getItem("selected_character");
      if (selectedChar == null) {
        this.switchCharacter(char);
        return true
      }
      return selectedChar == char.CharacterID.toString();
    });
  }

  get characters(): Character[] {
    let characters = JSON.parse(window.localStorage.getItem("characters")) as Character[];
    return characters || [];
  }

  addCharacter(char: Character) {
    let characters = this.characters || [];
    if (characters.indexOf(char) != -1)
      throw new DOMException();
    characters.push(char);
    window.localStorage.setItem("characters", JSON.stringify(characters));
  }

  removeCharacter(char: Character) {
    this._character = null;
    let remaining = this.characters.filter(char => { char.CharacterID != char.CharacterID })
    window.localStorage.setItem("characters", JSON.stringify(remaining));
  }

  switchCharacter(char: Character) {
    console.log("Switching to", char, "from", this._character);

    this._character = this.characters.find(c => { return c.CharacterID == char.CharacterID });
    window.localStorage.setItem("selected_character", this.character.CharacterID.toString());
  }

  public loadCharacter(token: AccessToken): Observable<Character> {
    return this.http.get<Character>("http://localhost:4201/oauth/verify", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token.access_token
      })
    }).map((char: Character) => {
      console.log("New char", char);
      this._character = char;
      this._character.Token = token;
      this.addCharacter(char);
      return char;
    });
  }
}
