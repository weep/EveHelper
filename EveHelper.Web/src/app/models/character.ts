import { AccessToken } from "./access-token";

export class Character {
    CharacterID: number;
    CharacterName: string;
    ExpiresOn: Date;
    Scopes: string;
    TokenType: string;
    CharacterOwnerHash: string;
    IntellectualProperty: string;
    Token: AccessToken
}
