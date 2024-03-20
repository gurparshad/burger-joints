import { Component, Input, OnInit } from '@angular/core';
import { FoursquareBurgerJointPhoto, Venue } from '../types/types';
import { FoursquareService } from '../foursquare.service';
import { RecognizeBurgerService } from '../recognizeBurger.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent implements OnInit {
  constructor(private foursquareService: FoursquareService, private recognizeBurgerService: RecognizeBurgerService) { }

  @Input() burgerJoints: Venue[] = [];

  latestPhotos: string[] = [];
  burgerImages: string[] = [];
  size = 200;

  ngOnInit(): void {
    this.processBurgerJoints();
  }

  processBurgerJoints(): void {
    this.burgerJoints.forEach((place: Venue) => {
      this.getLatestImageAndRecognizeBurger(place.fsq_id)
    })
  }

  getLatestImageAndRecognizeBurger(id: string): void {
    this.foursquareService.getLatestBurgerJointImage(id).subscribe((data: FoursquareBurgerJointPhoto[]) => {
      if (data[0]) {
        const photoUrl = `${data[0].prefix}${this.size}${data[0].suffix}`;
        this.latestPhotos.push(photoUrl);
        this.recognizeBurger(photoUrl);
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
