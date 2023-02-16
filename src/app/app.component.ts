import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { GoogleApiService, UserInfo } from './google-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'urlshortner';
  showContact = false;
  userInfo?: UserInfo;
  Name = 'Ankur guglani';
  Email = 'ankur.guglani@tigeranalytics.com';
  Address = 'RMZ Millenia Business Park 2, Campus 5, 2nd Floor, No. 143, Kandanchavadi, MGR Road, Perungudi, Chennai,Tamil Nadu ,600096';
  Mobile = '555-555-5555';
  shortUrl: string = '';
  longUrl: string = '';
  shortenedUrls: string[] = [];
  constructor(private http: HttpClient, private apiService: ApiService, private readonly googleApi: GoogleApiService) {
    googleApi.userProfileSubject.subscribe(info => {
      this.userInfo = info,
        this.shortenedUrls.push(this.shortUrl);
    }, error => {
      console.log('Error: ', error);
      alert('Failed to shorten URL. Please check the URL and try again.');
    });
  }


  toggleContact() {
    this.showContact = !this.showContact;
    if (!this.showContact) {
      // If showContact is false, reset the contact information
      this.Name = 'Ankur guglani';
      this.Email = 'ankur.guglani@tigeranalytics.com';
      this.Address = 'RMZ Millenia Business Park 2, Campus 5, 2nd Floor, No. 143, Kandanchavadi, MGR Road, Perungudi, Chennai,Tamil Nadu ,600096';
      this.Mobile = '555-555-5555';

    }
  }
  reset() {
    this.showContact = false;
    this.Name = 'Ankur guglani';
    this.Email = 'ankur.guglani@tigeranalytics.com';
    this.Address = 'RMZ Millenia Business Park 2, Campus 5, 2nd Floor, No. 143, Kandanchavadi, MGR Road, Perungudi, Chennai,Tamil Nadu ,600096';
    this.Mobile = '555-555-5555';
  }

  generateShortUrl() {
    if (!this.isValidUrl(this.longUrl)) {
      alert('Invalid URL. Please enter a valid URL and try again.');
      return;
    }
    this.apiService.getShortUrl(this.longUrl).subscribe(response => {
      if (response.ok) {
        this.shortUrl = response.result.short_link;
      }
    }, error => {
      console.log('Error: ', error);
      alert('Failed to shorten URL. Please check the URL and try again.');
    });
  }
  copyToClipboard() {
    const copyText = document.getElementById("shorten_link") as HTMLInputElement;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
  }
  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn()
  }

  logout() {
    this.googleApi.signOut()
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
}







