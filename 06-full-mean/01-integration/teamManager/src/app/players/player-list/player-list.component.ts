import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services';
import { Team } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  teams: Team[] = [];
  constructor(private readonly teamService: TeamService, private readonly router: Router) { }

  ngOnInit() {
    this.getTeams()
  }
  getTeams() {
    this.teamService.getTeams()
      .subscribe(teams => {
        console.log("All team players", teams);
        this.teams = teams;
      })
  }
  delete(team: Team) {
    if (confirm(`Are you sure you want to remove ${team.name}`) === true) {
      this.teamService.deleteTeam(team._id)
        .subscribe(removedTeam => {
          console.log("Removed team", removedTeam);
          this.getTeams();
        })
    }
  }
}
