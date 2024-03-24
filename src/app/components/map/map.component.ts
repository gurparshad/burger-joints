import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Venue } from '../../types/types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit, OnChanges {
  @Input() burgerJoints: Venue[] = [];

  @ViewChild('mapContainer', { static: true })
  mapContainer!: ElementRef<HTMLDivElement>;
  map!: google.maps.Map;
  circle!: google.maps.Circle;
  center: google.maps.LatLngLiteral = {
    lat: 58.3801,
    lng: 26.72,
  };
  zoom = 13;
  openInfoWindow: google.maps.InfoWindow | null = null;

  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['burgerJoints'] && !changes['burgerJoints'].firstChange) {
      this.updateMap();
    }
  }

  initMap(): void {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
    });

    this.circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      center: this.center,
      radius: 1000,
    });
  }

  updateMap(): void {
    const icon = {
      url: 'assets/icons/burgerIcon.png',
      scaledSize: new google.maps.Size(35, 45),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(22.5, 45),
    };

    this.burgerJoints.forEach((place: Venue) => {
      const latLng = new google.maps.LatLng(
        place.geocodes.main.latitude,
        place.geocodes.main.longitude
      );
      const marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: place.name,
        icon: icon,
      });

      marker.addListener('click', () => {
        if (this.openInfoWindow) {
          this.openInfoWindow.close();
        }
        const infoWindow = new google.maps.InfoWindow({
          content: place.name,
        });
        infoWindow.open(this.map, marker);
        this.openInfoWindow = infoWindow;
      });
    });
  }
}
