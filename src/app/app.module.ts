import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FoursquareService } from './foursquare.service';
import { HttpClientModule } from '@angular/common/http';
import { PhotosComponent } from './photos/photos.component';
import { RecognizeBurgerService } from './recognizeBurger.service';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule
  ],
  providers: [FoursquareService, RecognizeBurgerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
