import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { Author } from '../../models';
import { AuthorsService } from '../../services';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  author: Author;
  errors: String[] = [];
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.author = {} as any;
    this.route.paramMap
      .pipe(
        map(params => params.get('author_id')),
        switchMap(id => this.authorsService.getAuthor(id))
      )
      .subscribe(author => this.author = author)
  }
  onUpdate(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('Updating author', this.author);
    this.authorsService.getUpdate(this.author)
      .subscribe(updatedAuthor => {
        console.log("Updated author", updatedAuthor);
        this.router.navigateByUrl('/');
      },
        error => {
          this.handleErrors(error.error);
        })
    form.reset();
  }
  private handleErrors(errors: string[] | string) {
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}
