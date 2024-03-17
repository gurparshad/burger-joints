import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  map!: google.maps.Map;
  circle!: google.maps.Circle;
  center: google.maps.LatLngLiteral = {
    lat: 58.3776,
    lng: 26.7291
  };
  zoom = 9;

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    this.circle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: this.map,
      center: this.center,
      radius: 1000
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
