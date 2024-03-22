import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  private http = inject(HttpClient);

  getBurgerJointsInTartu(): Observable<Venue[]> {
    const headers = new HttpHeaders({
      Authorization: environment.foursquareApiKey || 'API_KEY',
    });

    const tartuBusStationLat = 58.3801;
    const tartuBusStationLng = 26.72;

    const centerPoint = `${tartuBusStationLat},${tartuBusStationLng}`;

    const params = new HttpParams()
      .set('limit', 50)
      .set('ll', centerPoint)
      .set('categories', 13031);

    return this.http
      .get<FoursquareBurgerJointsResponse>(`${this.baseUrl}/search`, {
        headers,
        params,
      })
      .pipe(
        map((response: FoursquareBurgerJointsResponse) => {
          console.log('response-->>', response.results);
          return response.results.filter(
            (venue: Venue) => venue.distance > 1000
          );
        })
      );
  }

  getLatestBurgerJointImage(
    fsq_id: string
  ): Observable<FoursquareBurgerJointPhoto[]> {
    const headers = new HttpHeaders({
      Authorization: environment.foursquareApiKey || 'API_KEY',
    });

    const params = new HttpParams().set('sort', 'newest');

    return this.http.get<FoursquareBurgerJointPhoto[]>(
      `${this.baseUrl}/${fsq_id}/photos`,
      { headers, params }
    );
  }
}
