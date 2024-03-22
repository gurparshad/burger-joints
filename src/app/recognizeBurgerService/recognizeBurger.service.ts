import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RecognizeBurgerResponse } from '../types/types';

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
        `${process.env['RECOGNIZE_BURGER_API_URL']}`,
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
          console.error('An error occurred:', error);
          return of('No burger found.');
        })
      );
  }
}
