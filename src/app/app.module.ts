import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FoursquareService } from './foursquareService/foursquare.service';
import { HttpClientModule } from '@angular/common/http';
import { PhotosComponent } from './photos/photos.component';
import { RecognizeBurgerService } from './recognizeBurgerService/recognizeBurger.service';
import { MapComponent } from './map/map.component';
import { loadingReducer } from './store/loading/loading.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [AppComponent, PhotosComponent, MapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    StoreModule.forRoot({ loading: loadingReducer }),
  ],
  providers: [FoursquareService, RecognizeBurgerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
