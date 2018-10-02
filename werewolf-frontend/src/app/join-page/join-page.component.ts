import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { SocketService } from '../socket.service';
import { Player } from '../classes/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.sass']
})
export class JoinPageComponent implements OnInit {
  @Input() username: string;
  @Input() gameCode: string;

  constructor(
    private apiClientService: ApiClientService,
    private socketService: SocketService,
    private router: Router,
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
        this.apiClientService.setGameId(this.gameCode);
        this.socketService.initSocket(this.gameCode, playerId);
        this.router.navigateByUrl('/game');
      });
  }
}
