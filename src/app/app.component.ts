import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FoursquareService } from './foursquare.service';
import { RecognizeBurgerService } from './recognizeBurger.service';
import { FoursquareBurgerJointPhoto, Venue } from './types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private foursquareService: FoursquareService, private recognizeBurgerService: RecognizeBurgerService) { }

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;
  map!: google.maps.Map;
  circle!: google.maps.Circle;
  center: google.maps.LatLngLiteral = {
    lat: 58.3801,
    lng: 26.7200
  };
  zoom = 13;
  latestPhotos: string[] = [];
  burgerImages: string[] = [];
  size = 200;
  openInfoWindow: google.maps.InfoWindow | null = null;

  ngOnInit(): void {
    this.initMap();
    this.fetchBurgerJointsInTartu();
  }

  initMap(): void {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    this.circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      center: this.center,
      radius: 1000
    });
  }

  fetchBurgerJointsInTartu(): void {
    const icon = {
      url: 'assets/icons/burgerIcon.png',
      scaledSize: new google.maps.Size(35, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(22.5, 45)
    };

    this.foursquareService.getBurgerJointsInTartu().subscribe((data: Venue[]) => {
      const places = data;
      places.forEach((place: Venue) => {
        const latLng = new google.maps.LatLng(place.geocodes.main.latitude, place.geocodes.main.longitude);
        const marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: place.name,
          icon: icon
        });
        const infoWindow = new google.maps.InfoWindow({
          content: place.name
        });

        marker.addListener('click', () => {
          if (this.openInfoWindow) {
            this.openInfoWindow.close();
          }
          infoWindow.open(this.map, marker);
          this.openInfoWindow = infoWindow;
        });

        this.getLatestImageAndRecognizeBurger(place.fsq_id);
      });
    });
  }

  getLatestImageAndRecognizeBurger(id: string): void {
    this.foursquareService.getLatestBurgerJointImage(id).subscribe((data: FoursquareBurgerJointPhoto[]) => {
      if (data[0]) {
        const photoUrl = `${data[0].prefix}${this.size}${data[0].suffix}`;
        this.latestPhotos.push(photoUrl);
        // this.recognizeBurger(photoUrl);
      }
    });
  }

  recognizeBurger(photoUrl: string): void {
    this.recognizeBurgerService.recognizeBurger(photoUrl).subscribe((response) => {
      this.burgerImages.push(response);
    });
  }

  isBurgerImage(photoUrl: string): boolean {
    return this.burgerImages.includes(photoUrl);
  }


}
