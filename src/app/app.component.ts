import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FoursquareService } from './foursquare.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private foursquareService: FoursquareService) { }

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;
  map!: google.maps.Map;
  circle!: google.maps.Circle;
  center: google.maps.LatLngLiteral = {
    lat: 58.3801,
    lng: 26.7200
  };
  zoom = 13;
  latestPhotos: any[] = []; // Array to store latest photos
  size = 200;

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
    this.foursquareService.getBurgerJointsInTartu().subscribe((data: any) => {
      const places = data.results;
      places.forEach((place: any) => {
        const latLng = new google.maps.LatLng(place.geocodes.main.latitude, place.geocodes.main.longitude);
        const marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: place.name
        });
        marker.addListener('click', () => {
          const infoWindow = new google.maps.InfoWindow({
            content: place.name
          });
          infoWindow.open(this.map, marker);
        });

        // Fetch latest photo for each place
        this.getLatestImages(place.fsq_id);
      });
    });
  }

  getLatestImages(id: string): void {
    this.foursquareService.getLatestBurgerJointImage(id).subscribe((data: any) => {
      console.log("data-->>", data[0]);
      this.latestPhotos.push(data[0]); // Push latest photo to the array
    });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
      this.map.setCenter(event.latLng);
      this.circle.setCenter(event.latLng);
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
    }
  }
}
