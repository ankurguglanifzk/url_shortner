import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api: string = "";
  shortenedUrls: string[] = [];


  constructor(private http: HttpClient) {
    const api = 'https://api.shrtco.de/v2/shorten';
  }


  //To fetch Short Url from Api 
  getShortUrl(url: string): Observable<any> {

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('status', '201 Created')

    const _params = new HttpParams().set('url', url);

    const httpOptions = {
      headers: headers,
      params: _params,
      withCredentials: true
    };


    this.api = "https://api.shrtco.de/v2/shorten/";
    const urlParams = new HttpParams().set('url', url);

    return this.http.get<JSON>(`https://api.shrtco.de/v2/shorten?url=${url}`).pipe(map((res: any) => res), catchError((err: any) => {
      return throwError('Error fetching short URL');
    })
    );


  }

  addShortenedUrl(shortUrl: string) {
    this.shortenedUrls.push(shortUrl);
  }

}




