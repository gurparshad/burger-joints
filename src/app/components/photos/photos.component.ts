import { Component, Input, OnInit } from '@angular/core';
import { FoursquareBurgerJointPhoto, Venue } from '../../types/types';
import { FoursquareService } from '../../services/foursquareService/foursquare.service';
import { RecognizeBurgerService } from '../../services/recognizeBurgerService/recognizeBurger.service';
import { Store, select } from '@ngrx/store';
import { setLoadingFalse } from '../../store/loading/loading.actions';
import { getLoadingState } from '../../store/loading/loading.selectors';
import { EMPTY, Observable, concatMap } from 'rxjs';
import { AppState } from '../../store/app-state';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent implements OnInit {
  loading$!: Observable<boolean>;
  constructor(
    private foursquareService: FoursquareService,
    private recognizeBurgerService: RecognizeBurgerService,
    private store: Store<AppState>
  ) {}

  @Input() burgerJoints: Venue[] = [];

  latestPhotos: string[] = [];
  burgerImages: string[] = [];
  size = 200;
  successfulPhotoRetrievals: number = 0;

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(getLoadingState));
    this.processBurgerJoints();
  }

  processBurgerJoints(): void {
    this.burgerJoints.forEach((place: Venue) => {
      this.getLatestImageAndRecognizeBurger(place.fsq_id);
    });
  }

  getLatestImageAndRecognizeBurger(id: string): void {
    this.foursquareService
      .getLatestBurgerJointImage(id)
      .pipe(
        concatMap((data: FoursquareBurgerJointPhoto[]) => {
          if (data[0]) {
            const photoUrl = `${data[0].prefix}${this.size}${data[0].suffix}`;
            this.latestPhotos.push(photoUrl);
            return this.recognizeBurger(photoUrl);
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe(response => {
        if (response != null) {
          this.burgerImages.push(response);
          this.successfulPhotoRetrievals++;
        }

        if (this.successfulPhotoRetrievals === this.latestPhotos.length) {
          this.store.dispatch(setLoadingFalse());
        }
      });
  }

  recognizeBurger(photoUrl: string): Observable<any> {
    return this.recognizeBurgerService.recognizeBurger(photoUrl);
  }

  isBurgerImage(photoUrl: string): boolean {
    return this.burgerImages.includes(photoUrl);
  }
}
