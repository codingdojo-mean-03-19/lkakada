import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services';
import { Team } from '../../models';

@Component({
  selector: 'app-game3',
  templateUrl: './game3.component.html',
  styleUrls: ['./game3.component.css']
})
export class Game3Component implements OnInit {
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
    console.log("Player", team.game3)
    team.game3 = "playing";
    this.teamService.updateTeam(team)
      .subscribe(team => {
        console.log('Updated status', team.game3)
      })
  }
  undecided(team: Team) {
    console.log("Player", team.game3)
    team.game3 = "undecided";
    this.teamService.updateTeam(team)
      .subscribe(team => {
        console.log('Updated status', team.game3)
      })
  }
  notPlaying(team: Team) {
    console.log("Player", team.game3)
    team.game3 = "not playing";
    this.teamService.updateTeam(team)
      .subscribe(team => {
        console.log('Updated status', team.game3)
      })
  }

}
