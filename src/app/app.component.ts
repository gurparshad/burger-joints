import { Component, OnInit } from '@angular/core';
import { FoursquareService } from './foursquare.service';
import { Venue } from './types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private foursquareService: FoursquareService) {}
  loadingData: boolean = false;
  burgerJointsData: Venue[] = [];

  ngOnInit(): void {
    this.fetchBurgerJointsInTartu();
  }

  fetchBurgerJointsInTartu(): void {
    this.loadingData = true;
    this.foursquareService
      .getBurgerJointsInTartu()
      .subscribe((data: Venue[]) => {
        this.burgerJointsData = data;
        this.loadingData = false;
      });
  }
}
