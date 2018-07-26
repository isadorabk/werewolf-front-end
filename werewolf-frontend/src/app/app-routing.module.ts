import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandpageComponent } from './landpage/landpage.component';
import { JoinPageComponent } from './join-page/join-page.component';
import { LobbyPageComponent } from './lobby-page/lobby-page.component';

const routes: Routes = [
  { path: "", component: LandpageComponent },
  { path: "join", component: JoinPageComponent },
  { path: "lobby", component: LobbyPageComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
