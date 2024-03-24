import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RecognizeBurgerResponse } from '../../utils/types';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class RecognizeBurgerService {
  constructor(private http: HttpClient) {}

  recognizeBurger(imageUrl: string): Observable<string> {
    const requestBody = { urls: [imageUrl] };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<RecognizeBurgerResponse>(
        environment.recognizeBurgerApiUrl,
        requestBody,
        { headers }
      )
      .pipe(
        map((response: RecognizeBurgerResponse) => {
          if (response && response.urlWithBurger) {
            return response.urlWithBurger;
          } else {
            return '';
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            console.error('404 Error:', error);
            return of('No burger found.');
          } else if (error.status === 500) {
            console.error('500 Error:', error);
            return of('Internal Server Error.');
          } else {
            console.error('An error occurred:', error);
            return of('Unknown error occurred.');
          }
        })
      );
  }
}
