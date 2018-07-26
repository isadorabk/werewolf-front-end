import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.sass']
})
export class LandpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  createGame() {
    console.log('hi');
    
  }

}
