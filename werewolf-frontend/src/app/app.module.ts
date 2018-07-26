import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminLandpageComponent } from './admin-landpage/admin-landpage.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLandpageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
