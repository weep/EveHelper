import { Injectable, OnInit } from '@angular/core';
import { AccessToken } from '../models/access-token';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  //private scopes: string = "corporationContactsRead,publicData,characterStatsRead,characterFittingsRead,characterFittingsWrite,characterContactsRead,characterContactsWrite,characterLocationRead,characterNavigationWrite,characterWalletRead,characterAssetsRead,characterCalendarRead,characterFactionalWarfareRead,characterIndustryJobsRead,characterKillsRead,characterMailRead,characterMarketOrdersRead,characterMedalsRead,characterNotificationsRead,characterResearchRead,characterSkillsRead,characterAccountRead,characterContractsRead,characterBookmarksRead,characterChatChannelsRead,characterClonesRead,characterOpportunitiesRead,characterLoyaltyPointsRead,corporationWalletRead,corporationAssetsRead,corporationMedalsRead,corporationFactionalWarfareRead,corporationIndustryJobsRead,corporationKillsRead,corporationMembersRead,corporationMarketOrdersRead,corporationStructuresRead,corporationShareholdersRead,corporationContractsRead,corporationBookmarksRead,fleetRead,fleetWrite,structureVulnUpdate,remoteClientUI,esi-calendar.respond_calendar_events.v1,esi-calendar.read_calendar_events.v1,esi-location.read_location.v1,esi-location.read_ship_type.v1,esi-mail.organize_mail.v1,esi-mail.read_mail.v1,esi-mail.send_mail.v1,esi-skills.read_skills.v1,esi-skills.read_skillqueue.v1,esi-wallet.read_character_wallet.v1,esi-wallet.read_corporation_wallet.v1,esi-search.search_structures.v1,esi-clones.read_clones.v1,esi-characters.read_contacts.v1,esi-universe.read_structures.v1,esi-bookmarks.read_character_bookmarks.v1,esi-killmails.read_killmails.v1,esi-corporations.read_corporation_membership.v1,esi-assets.read_assets.v1,esi-planets.manage_planets.v1,esi-fleets.read_fleet.v1,esi-fleets.write_fleet.v1,esi-ui.open_window.v1,esi-ui.write_waypoint.v1,esi-characters.write_contacts.v1,esi-fittings.read_fittings.v1,esi-fittings.write_fittings.v1,esi-markets.structure_markets.v1,esi-corporations.read_structures.v1,esi-corporations.write_structures.v1,esi-characters.read_loyalty.v1,esi-characters.read_opportunities.v1,esi-characters.read_chat_channels.v1,esi-characters.read_medals.v1,esi-characters.read_standings.v1,esi-characters.read_agents_research.v1,esi-industry.read_character_jobs.v1,esi-markets.read_character_orders.v1,esi-characters.read_blueprints.v1,esi-characters.read_corporation_roles.v1,esi-location.read_online.v1,esi-contracts.read_character_contracts.v1,esi-clones.read_implants.v1,esi-characters.read_fatigue.v1,esi-killmails.read_corporation_killmails.v1,esi-corporations.track_members.v1,esi-wallet.read_corporation_wallets.v1,esi-characters.read_notifications.v1,esi-corporations.read_divisions.v1,esi-corporations.read_contacts.v1,esi-assets.read_corporation_assets.v1,esi-corporations.read_titles.v1,esi-corporations.read_blueprints.v1,esi-bookmarks.read_corporation_bookmarks.v1,esi-contracts.read_corporation_contracts.v1,esi-corporations.read_standings.v1,esi-corporations.read_starbases.v1,esi-industry.read_corporation_jobs.v1,esi-markets.read_corporation_orders.v1,esi-corporations.read_container_logs.v1,esi-industry.read_character_mining.v1,esi-industry.read_corporation_mining.v1";
  private scopes: string = "publicData esi-calendar.respond_calendar_events.v1 esi-calendar.read_calendar_events.v1 esi-location.read_location.v1 esi-location.read_ship_type.v1 esi-mail.organize_mail.v1 esi-mail.read_mail.v1 esi-mail.send_mail.v1 esi-skills.read_skills.v1 esi-skills.read_skillqueue.v1 esi-wallet.read_character_wallet.v1 esi-wallet.read_corporation_wallet.v1 esi-search.search_structures.v1 esi-clones.read_clones.v1 esi-characters.read_contacts.v1 esi-universe.read_structures.v1 esi-bookmarks.read_character_bookmarks.v1 esi-killmails.read_killmails.v1 esi-corporations.read_corporation_membership.v1 esi-assets.read_assets.v1 esi-planets.manage_planets.v1 esi-fleets.read_fleet.v1 esi-ui.open_window.v1 esi-fittings.read_fittings.v1 esi-markets.structure_markets.v1 esi-corporations.read_structures.v1 esi-characters.read_loyalty.v1 esi-characters.read_opportunities.v1 esi-characters.read_chat_channels.v1 esi-characters.read_medals.v1 esi-characters.read_standings.v1 esi-characters.read_agents_research.v1 esi-industry.read_character_jobs.v1 esi-markets.read_character_orders.v1 esi-characters.read_blueprints.v1 esi-characters.read_corporation_roles.v1 esi-location.read_online.v1 esi-contracts.read_character_contracts.v1 esi-clones.read_implants.v1 esi-characters.read_fatigue.v1 esi-killmails.read_corporation_killmails.v1 esi-corporations.track_members.v1 esi-wallet.read_corporation_wallets.v1 esi-characters.read_notifications.v1 esi-corporations.read_divisions.v1 esi-corporations.read_contacts.v1 esi-assets.read_corporation_assets.v1 esi-corporations.read_titles.v1 esi-corporations.read_blueprints.v1 esi-bookmarks.read_corporation_bookmarks.v1 esi-contracts.read_corporation_contracts.v1 esi-corporations.read_standings.v1 esi-corporations.read_starbases.v1 esi-industry.read_corporation_jobs.v1 esi-markets.read_corporation_orders.v1 esi-corporations.read_container_logs.v1 esi-industry.read_character_mining.v1 esi-industry.read_corporation_mining.v1";
  private clientId: string = "7a9cf164e37e42f794d4ed0fba8a05d9";
  private callbackUrl: string = "http://localhost:4200/auth/callback";
  private loginUrl: string = "login.eveonline.com";
  private responseType: string = "code";

  private refreshInterval;

  private lastRefresh: Date;
  private nextRefresh: Date;
  public refreshCountdown: number;

  constructor(private http: HttpClient) {
    console.log("AuthService Constructor");
    //this.refreshInterval = setInterval(() => this.refresh(), 10 * 1000 * 60);
    setInterval(() => this.tickDown(), 100);

    this.lastRefresh = new Date();
    this.nextRefresh = new Date();
    this.nextRefresh.setMinutes(this.lastRefresh.getMinutes() + 10);
  }

  private tickDown() {
    var now = new Date();
    this.refreshCountdown = Math.round((this.nextRefresh.getTime() - now.getTime()) / 1000);
    //console.log(this.refreshCountdown);
    if(this.refreshCountdown < 0)
      this.refresh();
  }

  authorize() {
    console.log(this.scopes);
    var completeLoginUrl = `https://${this.loginUrl}/oauth/authorize?response_type=${this.responseType}&redirect_uri=${this.callbackUrl}&client_id=${this.clientId}&scope=${this.scopes}`;
    window.location.href = completeLoginUrl;
  }

  private refresh() {
    if (this.getAccessToken() != null) {
      console.log("Refreshing token...");

      this.lastRefresh = new Date();
      this.nextRefresh = new Date();
      this.nextRefresh.setMinutes(this.lastRefresh.getMinutes() + 10);

      return this.http.post<AccessToken>("http://localhost:4201/api/token", {
        "refreshToken": this.getAccessToken().refresh_token,
      }).map(token => {
        this.setAccessToken(token);
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
    let token = this.getAccessToken();
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

  getAccessToken(): AccessToken {
    return JSON.parse(window.localStorage.getItem("access_token"));
  }

  character() {
    let token = this.getAccessToken();
    return this.http.get("http://localhost:4201/oauth/verify", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token.access_token
      })
    });
  }
}
