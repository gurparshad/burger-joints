import { Component, OnInit } from '@angular/core';
import { FoursquareService } from './services/foursquareService/foursquare.service';
import { Venue } from './utils/types';
import { setLoadingTrue } from './store/loading/loading.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/app-state';
import { Observable } from 'rxjs';
import { getLoadingState } from './store/loading/loading.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading$!: Observable<boolean>;
  constructor(
    private foursquareService: FoursquareService,
    private store: Store<AppState>
  ) {}
  burgerJointsData: Venue[] = [];

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(getLoadingState));
    this.fetchBurgerJointsInTartu();
  }

  fetchBurgerJointsInTartu(): void {
    this.store.dispatch(setLoadingTrue());
    this.foursquareService
      .getBurgerJointsInTartu()
      .subscribe((data: Venue[]) => {
        this.burgerJointsData = data;
      });
  }
}
