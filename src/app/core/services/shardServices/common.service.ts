import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonHttpService {
  constructor(private http: HttpClient) {}

  CommonPostRequests(model: any, url: string): Observable<any> {
    return this.http.post<any>(`${url}`, model);
  }
  CommonPutRequests(model: any, url: string): Observable<any> {
    return this.http.put<any>(`${url}`, model);
  }
  CommonGetRequests(url: string): Observable<any> {
    return this.http.get<any>(`${url}`);
  }
  CommonDeleteRequest(url: string): Observable<any> {
    return this.http.delete<any>(`${url}`);
  }
  CommonGetRequestsWithQuery(url: string, Model: any): Observable<any> {
    if (Model) {
      let queryString = Object.keys(Model)
        .map((key: string) =>
          Model[key] != null && Model[key] != '' && Model[key] != undefined
            ? key + '=' + Model[key]
            : null
        )
        .filter((x) => x != null)
        .join('&');
      url += queryString == '' ? '' : '?' + queryString;
    }
    return this.http.get<any>(`${url}`);
  }

  CommonPostRequestsWithQuery(
    url: string,
    Model: any,
    body: any
  ): Observable<any> {
    if (Model) {
      let queryString = Object.keys(Model)
        .map((key: string) =>
          (Model[key] != null && Model[key] != '' && Model[key] != undefined) ||
          Model[key] === false
            ? key + '=' + Model[key]
            : null
        )
        .filter((x) => x != null)
        .join('&');
      url += queryString == '' ? '' : '?' + queryString;
    }
    return this.http.post<any>(`${url}`, body);
  }

  CommonPutRequestsWithQuery(
    url: string,
    Model: any,
    body: any
  ): Observable<any> {
    if (Model) {
      let queryString = Object.keys(Model)
        .map((key: string) =>
          (Model[key] != null && Model[key] != '' && Model[key] != undefined) ||
          Model[key] === false
            ? key + '=' + Model[key]
            : null
        )
        .filter((x) => x != null)
        .join('&');
      url += queryString == '' ? '' : '?' + queryString;
    }
    return this.http.put<any>(`${url}`, body);
  }

}
