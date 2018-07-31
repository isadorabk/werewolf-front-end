import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
  @Input() player;
  card = {};
  showCard = false;

  constructor() { }

  ngOnInit() {
    this.card = this.player.card[this.player.role]
    if(this.player.lifeStatus === 'dead') this.showCard = false;
  }

  toggleCard(): void {
    if (this.player.lifeStatus === 'alive') this.showCard = !this.showCard;
    else this.showCard = false;
  }

  getCSSClasses(flag: string): object {
    let cssClasses;
    switch (flag) {
      case 'lifeStatus':
        if (this.player.lifeStatus === 'alive') {
          cssClasses = {
            'alive': true,
            'dead': false
          };
        }
        if (this.player.lifeStatus === 'dead') {
          cssClasses = {
            'alive': false,
            'dead': true
          };
        }
        return cssClasses;
      default:
        break;
    }

  }
}
