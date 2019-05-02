import { Component, OnInit, Input } from '@angular/core';
import { Author } from '../../models';
import { ActivatedRoute } from '@angular/router'
import { AuthorService } from '../../services'
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-author-show',
  templateUrl: './author-show.component.html',
  styleUrls: ['./author-show.component.css']
})
export class AuthorShowComponent implements OnInit {
  @Input()
  author: Author;

  constructor(private readonly authorService: AuthorService, private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('author_id')),
        switchMap(id => this.authorService.getAuthor(id))
      )
      .subscribe(author => (this.author = author))
  }

}
