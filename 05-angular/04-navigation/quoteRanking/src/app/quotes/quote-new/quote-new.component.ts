import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { Author } from '../../models';
import { AuthorsService, QuotesService } from '../../services';

@Component({
  selector: 'app-quote-new',
  templateUrl: './quote-new.component.html',
  styleUrls: ['./quote-new.component.css']
})
export class QuoteNewComponent implements OnInit {
  quote = new Author();
  errors: String[] = [];

  @Input()
  author: Author;

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly quotesService: QuotesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.author = { _id: '', name: '', quotes: [{ _id: '', content: '', votes: 0 }] };
    this.route.paramMap
      .pipe(
        map(params => params.get('author_id')),
        switchMap(id => this.authorsService.getAuthor(id))
      )
      .subscribe(author => {
        this.author = author
        console.log('Author', this.author);
      })
  }
  onSubmit(event: Event, form: NgForm, author_id: String) {
    event.preventDefault();
    console.log('Submitting quote', this.quote);
    this.quotesService.postQuote(author_id, this.quote)
      .subscribe(quote => {
        console.log("New quote", quote);
        this.router.navigateByUrl('/');
      },
        error => {
          console.log(error);
          this.handleErrors(error.error);
        })
    form.reset();
  }
  private handleErrors(errors: string[] | string) {
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}
