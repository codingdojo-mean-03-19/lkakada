import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Author } from '../../models';
import { AuthorsService, QuotesService } from '../../services';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {
  quotes: Author[] = [];
  authorId: String;
  @Input()
  author: Author;
  constructor(
    private authorsService: AuthorsService,
    private readonly route: ActivatedRoute,
    private readonly quotesService: QuotesService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.author = {} as any;
    this.route.paramMap
      .pipe(
        map(params => params.get('author_id')),
        switchMap(id => this.authorsService.getAuthor(id))
      )
      .subscribe(author => {
        this.author = author;
        this.authorId = author._id;
        console.log('Author', this.author);
      })
  }
  voteUp(quote: Author) {
    this.quotesService.editQuote(this.authorId, quote._id, 1)
      .subscribe(data => {
        console.log('Vote', data);
        this.onchange(data);

      })
  }
  voteDown(quote: Author) {
    this.quotesService.editQuote(this.authorId, quote._id, -1)
      .subscribe(data => {
        console.log('Vote', data);
        this.onchange(data);

      })
  }

  onchange(quote: Author) {
    console.log("onchange", quote)
    this.author = quote;
  }

  delete(quote: Author) {
    console.log('removed quote', quote);
    this.quotesService.deleteQuote(this.authorId, quote._id)
      .subscribe(author => {
        console.log('deleted quote', author);
        this.router.navigateByUrl('/');
      })
  }
}
