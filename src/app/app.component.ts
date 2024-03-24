import { Component, OnInit } from '@angular/core';
import { FoursquareService } from './services/foursquareService/foursquare.service';
import { Venue } from './utils/types';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loadingService/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading$!: Observable<boolean>;
  constructor(
    private foursquareService: FoursquareService,
    private loadingService: LoadingService
  ) {}
  burgerJointsData: Venue[] = [];

  ngOnInit(): void {
    this.loading$ = this.loadingService.getLoadingState();
    this.fetchBurgerJointsInTartu();
  }

  fetchBurgerJointsInTartu(): void {
    this.loadingService.setLoadingState(true);
    this.foursquareService
      .getBurgerJointsInTartu()
      .subscribe((data: Venue[]) => {
        this.burgerJointsData = data;
      });
  }
}
