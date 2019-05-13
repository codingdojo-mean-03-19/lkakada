import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Team } from '../../models';
import { TeamService } from '../../services';

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {
  team = new Team();
  errors: String[] = [];

  constructor(
    private readonly teamService: TeamService,
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('Submitting team', this.team);
    this.teamService.postTeam(this.team)
      .subscribe(team => {
        console.log('Submitted team', team)
        this.router.navigateByUrl('players/list');
      },
        error => {
          this.handleErrors(error);
          console.log(error);
        })
    form.reset();
  }

  private handleErrors(errors: string[] | string) {
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}
