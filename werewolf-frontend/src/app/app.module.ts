import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminLandpageComponent } from './admin-landpage/admin-landpage.component';
import { AppRoutingModule } from './/app-routing.module';
import { PlayerLandpageComponent } from './player-landpage/player-landpage.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLandpageComponent,
    PlayerLandpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
