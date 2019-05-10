import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Author } from '../../models';
import { NgForm } from '@angular/forms';

import { AuthorsService } from '../../services';

@Component({
  selector: 'app-author-new',
  templateUrl: './author-new.component.html',
  styleUrls: ['./author-new.component.css']
})
export class AuthorNewComponent implements OnInit {
  author = new Author();
  errors: String[] = [];
  constructor(
    private authersService: AuthorsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('Submitting author', this.author);
    this.authersService.postAuthor(this.author)
      .subscribe(author => {
        console.log("New author", author);
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
