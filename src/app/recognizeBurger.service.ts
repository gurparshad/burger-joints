import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecognizeBurgerService {

  constructor(private http: HttpClient) { }

  recognizeBurger(imageUrl: string): Observable<string> {
    const requestBody = { urls: [imageUrl] };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>('https://73kh1kvgx4.execute-api.eu-west-1.amazonaws.com/prod/recognize', requestBody, { headers }).pipe(
      map((response: any) => {
        if (response && response.urlWithBurger) {
          return response.urlWithBurger;
        } else {
          return null;
        }
      }),
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return of('No burger found.');
      })
    );
  }
}
