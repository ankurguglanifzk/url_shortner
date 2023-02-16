import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';


const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',

  strictDiscoveryDocumentValidation: false,

  redirectUri: window.location.origin,

  clientId: '542262970999-kjgte16u7jio74r1et1e59paf5um0gi9.apps.googleusercontent.com',

  scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',

  showDebugInformation: true,
};
export interface UserInfo {
  info: {
    sub: string
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  userProfileSubject = new Subject<UserInfo>()

  constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient) {
    oAuthService.configure(authCodeFlowConfig);
    oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";

    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {

        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow()
        } else {
          oAuthService.loadUserProfile().then((userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo);
          })
        }

      })
    });
  }
  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  signOut() {
    this.oAuthService.logOut()
  }
  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
    })
  }


}
