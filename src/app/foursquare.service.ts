import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService {
  private readonly baseUrl = 'http://localhost:3001';
  private readonly clientId = '4QVKZ42X2BLIP5G4UZ5XVJMRH04C2CSO2SAH3PBS3VINSCWH';
  private readonly clientSecret = 'J2N4AFVL2PPXT3NAM0DAT4KIBRAJ4FUPKCEIWF30SK3GLOLO';
  private readonly apiKey = 'fsq3GEVQvzNHfQp14wbZ+6D14vo4S5HoVsMM8Tis87DrZzM=';

  http = inject(HttpClient)

  getBurgerJointsInTartu(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'fsq3GEVQvzNHfQp14wbZ+6D14vo4S5HoVsMM8Tis87DrZzM=',
    });

    const tartuBusStationLat = 58.3801;
    const tartuBusStationLng = 26.7200;

    // Constructing the ll parameter for the center point
    const centerPoint = `${tartuBusStationLat},${tartuBusStationLng}`;

    // client secret and client ID should not go in the params.
    const params = new HttpParams()
      .set('ll', centerPoint)
      .set('limit', 50)
      .set('query', 'burger')
      .set('categories', 13031)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    return this.http.get(`${this.baseUrl}/search`, { params }).pipe(
      map((response: any) => {
        return response.results.filter((venue: any) => venue.distance > 1000);
      })
    );
  }

  getLatestBurgerJointImage(fsq_id: string): Observable<any> {
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('fsq_id', fsq_id)
      .set('sort', 'newest')
      .set('limit', 1);

    return this.http.get(`${this.baseUrl}/getLatestPhoto`, { params });
  }

}
