import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  FoursquareBurgerJointPhoto,
  FoursquareBurgerJointsResponse,
  Venue,
} from '../types/types';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class FoursquareService {
  private readonly baseUrl = environment.baseUrl || '';
  private headers = new HttpHeaders({
    Authorization: environment.foursquareApiKey || 'API_KEY',
  });

  constructor(private http: HttpClient) {}

  public getLatestBurgerJointImage(
    fsq_id: string
  ): Observable<FoursquareBurgerJointPhoto[]> {
    const params = new HttpParams().set('sort', 'newest');
    return this.http.get<FoursquareBurgerJointPhoto[]>(
      `${this.baseUrl}/${fsq_id}/photos`,
      { headers: this.headers, params }
    );
  }

  public getBurgerJointsInTartu(): Observable<Venue[]> {
    const tartuBusStationLat = 58.3801;
    const tartuBusStationLng = 26.72;

    const centerPoint = `${tartuBusStationLat},${tartuBusStationLng}`;
    const limit = 50;
    const categoryId = 13031;
    const params = new HttpParams()
      .set('limit', limit)
      .set('ll', centerPoint)
      .set('categories', categoryId);

    return this.http
      .get<FoursquareBurgerJointsResponse>(`${this.baseUrl}/search`, {
        headers: this.headers,
        params,
        observe: 'response',
      })
      .pipe(
        switchMap(response => {
          const venues: Venue[] =
            response.body?.results.filter(
              (venue: Venue) => venue.distance > 1000
            ) || [];
          const nextPageLink = response.headers.get('link');
          if (nextPageLink) {
            const nextPageUrl = this.extractNextPageUrl(nextPageLink);
            if (nextPageUrl) {
              return this.fetchNextPage(nextPageUrl).pipe(
                map(nextVenues => venues.concat(nextVenues))
              );
            }
          }
          return of(venues);
        })
      );
  }

  private fetchNextPage(nextPageUrl: string): Observable<Venue[]> {
    return this.http
      .get<FoursquareBurgerJointsResponse>(nextPageUrl, {
        headers: this.headers,
        observe: 'response',
      })
      .pipe(
        switchMap(response => {
          const venues: Venue[] =
            response.body?.results.filter(
              (venue: Venue) => venue.distance > 1000
            ) || [];
          const nextPageLink = response.headers.get('link');
          if (nextPageLink) {
            const nextPageUrl = this.extractNextPageUrl(nextPageLink);
            if (nextPageUrl) {
              return this.fetchNextPage(nextPageUrl).pipe(
                map(nextVenues => venues.concat(nextVenues))
              );
            }
          }
          return of(venues);
        })
      );
  }

  private extractNextPageUrl(linkHeader: string): string | null {
    const match = linkHeader.match(/<([^>]*)>; rel="next"/);
    return match ? match[1] : null;
  }
}
