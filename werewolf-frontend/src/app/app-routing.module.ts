import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLandpageComponent } from './admin-landpage/admin-landpage.component';
import { PlayerLandpageComponent } from './player-landpage/player-landpage.component';

const routes: Routes = [
  { path: "new-game", component: AdminLandpageComponent },
  { path: "", redirectTo: "/new-game", pathMatch: "full" },
  { path: "join-game", component: PlayerLandpageComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
