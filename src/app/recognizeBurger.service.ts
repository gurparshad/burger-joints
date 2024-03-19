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
    // Set the request body
    const requestBody = { urls: [imageUrl] };

    // Set the request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make the POST request and map the response to extract the URL with burger
    return this.http.post<any>('https://73kh1kvgx4.execute-api.eu-west-1.amazonaws.com/prod/recognize', requestBody, { headers }).pipe(
      map((response: any) => {
        // Check if URL with burger is found in the response
        if (response && response.urlWithBurger) {
          // Return the URL with burger
          return response.urlWithBurger;
        } else {
          // If URL with burger is not found, return null
          return null;
        }
      }),
      catchError((error: any) => {
        // Handle the error and return a custom error message
        console.error('An error occurred:', error);
        return of('No burger found.');
      })
    );
  }
}
