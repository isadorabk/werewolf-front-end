import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { NewGame } from '../classes/newGame';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.sass']
})
export class LandpageComponent implements OnInit {
  newGame: NewGame;
  gameId: string;
  adminId: string;

  constructor(
    private router: Router,
    private apiClientService: ApiClientService
  ) { }

  ngOnInit() {
  }
  
  createGame(): void {
    this
      .apiClientService.createGame()
      .subscribe(data => {
        this.newGame = data;
        this.gameId = this.newGame.gameId;
        this.adminId = this.newGame.adminId;
      });
  }

  joinPage() {
    this.router.navigateByUrl('/join');
  }

}
