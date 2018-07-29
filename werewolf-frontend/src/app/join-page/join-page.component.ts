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
  playerJoined = false;

  constructor(
    private router: Router,
    private apiClientService: ApiClientService,
    private socketService: SocketService
  ) { }

  ngOnInit() {
  }

  onSubmit(e) {
    e.preventDefault();
    this.createPlayer({username: this.username});
  }

  createPlayer(player): void {
    this.apiClientService.createPlayer(player)
      .subscribe(data => {
        const playerId = { playerId: data.playerId };
        this.socketService.initSocket(this.gameCode, playerId);
        this.playerJoined = true;
      })
  }
  
}
