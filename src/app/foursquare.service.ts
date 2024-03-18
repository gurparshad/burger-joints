import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

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

    // client secret and client ID should not go in the params.
    const params = new HttpParams()
      .set('near', 'Tartu')
      .set('query', 'burger')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
    // .set('v', '20240316');

    return this.http.get(`${this.baseUrl}/search`, { params });
  }

  getLatestBurgerJointImage(fsq_id: string): Observable<any> {
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('fsq_id', fsq_id);

    return this.http.get(`${this.baseUrl}/getLatestPhoto`, { params });
  }
}
