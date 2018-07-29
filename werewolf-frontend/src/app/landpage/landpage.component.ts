import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.sass']
})
export class LandpageComponent implements OnInit {

  gameId: string;

  constructor(
    private router: Router,
    private apiClientService: ApiClientService,
    private socketService: SocketService
  ) { }

  ngOnInit() { }

  createGame(): void {
    this.apiClientService.createGame()
      .subscribe(data => {
        this.gameId = data.gameId;
        const adminCode = { adminCode: data.adminCode};
        this.apiClientService.sendGameId(this.gameId);
        this.socketService.initSocket(data.gameId, adminCode);
        this.router.navigateByUrl('/admin');
      })
  }

  joinPage() {
    this.router.navigateByUrl('/join');
  }

}
