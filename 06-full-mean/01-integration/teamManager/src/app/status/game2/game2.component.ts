import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services';
import { Team } from '../../models';

@Component({
  selector: 'app-game2',
  templateUrl: './game2.component.html',
  styleUrls: ['./game2.component.css']
})
export class Game2Component implements OnInit {
  teams: Team[] = [];
  constructor(private readonly teamService: TeamService) { }

  ngOnInit() {
    this.getTeams();
  }
  getTeams() {
    this.teamService.getTeams()
      .subscribe(teams => {
        this.teams = teams;
      })
  }
  playing(team: Team) {
    console.log("Player", team.game2)
    team.game2 = "playing";
    this.teamService.updateTeam(team)
      .subscribe(team => {
        console.log('Updated status', team.game2)
      })
  }
  undecided(team: Team) {
    console.log("Player", team.game2)
    team.game2 = "undecided";
    this.teamService.updateTeam(team)
      .subscribe(team => {
        console.log('Updated status', team.game2)
      })
  }
  notPlaying(team: Team) {
    console.log("Player", team.game2)
    team.game2 = "not playing";
    this.teamService.updateTeam(team)
      .subscribe(team => {
        console.log('Updated status', team.game2)
      })
  }

}
