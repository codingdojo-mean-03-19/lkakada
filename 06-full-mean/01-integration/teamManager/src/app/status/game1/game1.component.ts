import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services';
import { Team } from '../../models';

@Component({
  selector: 'app-game1',
  templateUrl: './game1.component.html',
  styleUrls: ['./game1.component.css']
})
export class Game1Component implements OnInit {
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
    console.log("Player", team.game1)
    team.game1 = "playing";
    this.teamService.updateTeam(team)
      .subscribe(team => {
        console.log('Updated status', team.game1)
      })
  }
  undecided(team: Team) {
    console.log("Player", team.game1)
    team.game1 = "undecided";
    this.teamService.updateTeam(team)
      .subscribe(team => {
        console.log('Updated status', team.game1)
      })
  }
  notPlaying(team: Team) {
    console.log("Player", team.game1)
    team.game1 = "not playing";
    this.teamService.updateTeam(team)
      .subscribe(team => {
        console.log('Updated status', team.game1)
      })
  }
}
