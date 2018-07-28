import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.sass']
})
export class JoinPageComponent implements OnInit {
@Input() username: string;
@Input() gameCode: string;
players: object = {};

  constructor(
    private router: Router,
    private apiClientService: ApiClientService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log('form submitted');
    // console.log(this.username);
    // console.log(this.gameCode);
    this.createPlayer({username: this.username});
  }

  private initIoConnection(gameCode: string, playerId?): void {
    this.socketService.initSocket(gameCode, playerId)
  }

  createPlayer(player): void {
    this.apiClientService.createPlayer(player)
      .subscribe(data => {
        this.players[data.playerId] = data;
        const playerId = { playerId: data.playerId };
        this.initIoConnection(this.gameCode, playerId);
        this.router.navigateByUrl('/lobby');
      })
  }
  
}
