import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  FoursquareBurgerJointPhoto,
  FoursquareBurgerJointsResponse,
  Venue,
} from '../../utils/types';
import { environment } from '../../../../environment';
import {
  MAP_CENTER_LATITUDE,
  MAP_CENTER_LONGITUDE,
} from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class FoursquareService {
  private readonly baseUrl = environment.foursquareBaseUrl || '';
  private headers = new HttpHeaders({
    Authorization: environment.foursquareApiKey || 'API_KEY',
  });

  constructor(private http: HttpClient) {}

  public getLatestBurgerJointImage(
    fsqId: string
  ): Observable<FoursquareBurgerJointPhoto[]> {
    const params = new HttpParams().set('sort', 'newest');
    return this.http
      .get<
        FoursquareBurgerJointPhoto[]
      >(`${this.baseUrl}/${fsqId}/photos`, { headers: this.headers, params })
      .pipe(catchError(this.handleError));
  }

  public getBurgerJointsInTartu(): Observable<Venue[]> {
    const tartuBusStationLat = MAP_CENTER_LATITUDE;
    const tartuBusStationLng = MAP_CENTER_LONGITUDE;
    const distanceFromCenter = 1000;

    const centerPoint = `${tartuBusStationLat},${tartuBusStationLng}`;
    const limit = 50;
    const categoryId = 13031;
    const params = new HttpParams()
      .set('limit', limit)
      .set('ll', centerPoint)
      .set('categories', categoryId);

    return this.fetchVenues(`${this.baseUrl}/search`, params).pipe(
      switchMap(response => this.handleResponse(response, distanceFromCenter)),
      catchError(this.handleError)
    );
  }

  private fetchNextPage(
    nextPageUrl: string,
    distanceFromCenter: number
  ): Observable<Venue[]> {
    return this.fetchVenues(nextPageUrl).pipe(
      switchMap(response => this.handleResponse(response, distanceFromCenter)),
      catchError(this.handleError)
    );
  }

  private fetchVenues(
    url: string,
    params?: HttpParams
  ): Observable<HttpResponse<FoursquareBurgerJointsResponse>> {
    return this.http
      .get<FoursquareBurgerJointsResponse>(url, {
        headers: this.headers,
        params,
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  private handleResponse(
    response: HttpResponse<FoursquareBurgerJointsResponse>,
    distanceFromCenter: number
  ): Observable<Venue[]> {
    const venues: Venue[] =
      response.body?.results.filter(
        (venue: Venue) => venue.distance > distanceFromCenter
      ) || [];

    const nextPageLink = response.headers.get('link');
    if (nextPageLink) {
      const nextPageUrl = this.extractNextPageUrl(nextPageLink);
      if (nextPageUrl) {
        return this.fetchNextPage(nextPageUrl, distanceFromCenter).pipe(
          map(nextVenues => venues.concat(nextVenues))
        );
      }
    }
    return of(venues);
  }

  private extractNextPageUrl(linkHeader: string): string | null {
    const match = linkHeader.match(/<([^>]*)>; rel="next"/);
    return match ? match[1] : null;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => 'Something went wrong; please try again later.');
  }
}
