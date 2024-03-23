import { Component, Input, OnInit } from '@angular/core';
import { FoursquareBurgerJointPhoto, Venue } from '../types/types';
import { FoursquareService } from '../foursquareService/foursquare.service';
import { RecognizeBurgerService } from '../recognizeBurgerService/recognizeBurger.service';
import { Store, select } from '@ngrx/store';
import { setLoadingFalse } from '../store/loading/loading.actions';
import { getLoadingState } from '../store/loading/loading.selectors';
import { Observable } from 'rxjs';
import { AppState } from '../store/app-state';

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
    console.log(' this.loading$-->>', this.loading$);
    this.burgerJoints.forEach((place: Venue) => {
      this.getLatestImageAndRecognizeBurger(place.fsq_id);
    });
  }

  getLatestImageAndRecognizeBurger(id: string): void {
    this.foursquareService
      .getLatestBurgerJointImage(id)
      .subscribe((data: FoursquareBurgerJointPhoto[]) => {
        if (data[0]) {
          const photoUrl = `${data[0].prefix}${this.size}${data[0].suffix}`;
          this.latestPhotos.push(photoUrl);
          this.recognizeBurger(photoUrl);
        }
        this.successfulPhotoRetrievals = this.successfulPhotoRetrievals + 1;

        if (this.successfulPhotoRetrievals === this.burgerJoints.length) {
          this.store.dispatch(setLoadingFalse());
        }
      });
  }

  recognizeBurger(photoUrl: string): void {
    this.recognizeBurgerService
      .recognizeBurger(photoUrl)
      .subscribe(response => {
        this.burgerImages.push(response);
      });
  }

  isBurgerImage(photoUrl: string): boolean {
    return this.burgerImages.includes(photoUrl);
  }
}
