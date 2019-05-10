import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Author } from '../../models';
import { AuthorsService } from '../../services';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit, OnDestroy {

  authors: Author[] = [];
  sub: Subscription;
  constructor(private authorService: AuthorsService) { }

  ngOnInit() {
    console.log('ng on init');
    this.sub = this.authorService.getAuthors().subscribe(authors => {
      console.log("Got all authors", authors)
      this.authors = authors
    });
  }
  ngOnDestroy(): void {
    console.log('ng on destroy');
    this.sub.unsubscribe();
  }

}
