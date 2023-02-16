import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { GoogleApiService } from './google-api.service';
@NgModule({
  declarations: [
    AppComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    OAuthModule.forRoot()
  ],
  providers: [ApiService, GoogleApiService, OAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
