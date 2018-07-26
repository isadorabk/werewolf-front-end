import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandpageComponent } from './landpage/landpage.component';
import { AppRoutingModule } from './app-routing.module';
import { JoinPageComponent } from './join-page/join-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandpageComponent,
    JoinPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
