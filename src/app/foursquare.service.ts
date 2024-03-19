import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FoursquareBurgerJointPhoto, FoursquareBurgerJointsResponse, Venue } from './types/types';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService {
  private readonly baseUrl = process.env['PROXY_URL'] || '';
  private readonly clientId = process.env['FOURSQUARE_CLIENT_ID'] || '';
  private readonly clientSecret = process.env['FOURSQUARE_CLIENT_SECRET'] || '';

  private http = inject(HttpClient)

  getBurgerJointsInTartu(): Observable<Venue[]> {
    const headers = new HttpHeaders({
      'Authorization': process.env['FOURSQUARE_API_KEY'] || 'API_KEY',
    });

    const tartuBusStationLat = 58.3801;
    const tartuBusStationLng = 26.7200;

    const centerPoint = `${tartuBusStationLat},${tartuBusStationLng}`;

    const params = new HttpParams()
      .set('ll', centerPoint)
      .set('limit', 50)
      .set('query', 'burger')
      .set('categories', 13031)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    return this.http.get<FoursquareBurgerJointsResponse>(`${this.baseUrl}/search`, { headers, params }).pipe(
      map((response: FoursquareBurgerJointsResponse) => {
        return response.results.filter((venue: Venue) => venue.distance > 1000);
      })
    )
  }

  getLatestBurgerJointImage(fsq_id: string): Observable<FoursquareBurgerJointPhoto[]> {
    const headers = new HttpHeaders({
      'Authorization': process.env['FOURSQUARE_API_KEY'] || 'API_KEY',
    });

    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('fsq_id', fsq_id)
      .set('sort', 'newest')
      .set('limit', 1);

    return this.http.get<FoursquareBurgerJointPhoto[]>(`${this.baseUrl}/getLatestPhoto`, { headers, params });
  }

}
