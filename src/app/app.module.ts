import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FoursquareService } from './services/foursquareService/foursquare.service';
import { HttpClientModule } from '@angular/common/http';
import { PhotosComponent } from './components/photos/photos.component';
import { RecognizeBurgerService } from './services/recognizeBurgerService/recognizeBurger.service';
import { MapComponent } from './components/map/map.component';
import { LoadingService } from './services/loadingService/loading.service';

@NgModule({
  declarations: [AppComponent, PhotosComponent, MapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
  ],
  providers: [FoursquareService, RecognizeBurgerService, LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
