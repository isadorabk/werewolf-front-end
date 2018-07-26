import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLandpageComponent } from './admin-landpage/admin-landpage.component';

const routes: Routes = [
  { path: "game", component: AdminLandpageComponent },
  { path: "", redirectTo: "/game", pathMatch: "full" }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
