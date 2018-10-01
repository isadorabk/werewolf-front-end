import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-voting',
  templateUrl: './player-voting.component.html',
  styleUrls: ['./player-voting.component.sass']
})
export class PlayerVotingComponent implements OnInit {
  @Input() players;

  constructor() { }

  ngOnInit() {
  }

}
