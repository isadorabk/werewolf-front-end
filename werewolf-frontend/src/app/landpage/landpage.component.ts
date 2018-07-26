import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.sass']
})
export class LandpageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  createGame() {
    console.log('create a game');
  }

  joinPage() {
    this.router.navigateByUrl('/join');
  }

}
