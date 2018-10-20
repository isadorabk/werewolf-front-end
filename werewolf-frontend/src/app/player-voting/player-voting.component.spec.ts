import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerVotingComponent } from './player-voting.component';

describe('PlayerVotingComponent', () => {
  let component: PlayerVotingComponent;
  let fixture: ComponentFixture<PlayerVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
