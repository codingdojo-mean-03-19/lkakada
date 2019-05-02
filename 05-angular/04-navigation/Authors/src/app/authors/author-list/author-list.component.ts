import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Author } from '../../models';
import { AuthorService } from '../../services';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  sub: Subscription;
  selectedAuthor: Author;
  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    console.log("ng on init");
    this.sub = this.authorService.getAuthors().subscribe(authors => {
      console.log(authors);
      this.authors = authors;
    })
  }
  ngOnDestroy(): void {
    console.log('ng on destroy');
    this.sub.unsubscribe();
  }

  onDelete(event: Event, author: Author) {
    event.stopPropagation();
    console.log("Author id", author._id);
    this.authorService.removedAuthor(author._id).subscribe(removedAuthor => {
      console.log("deleted author", removedAuthor);
      this.authors = this.authors.filter(author => author._id !== removedAuthor._id);
    })
  }
  onSelect(author: Author) {
    console.log('Selected Author', author);
    this.selectedAuthor = this.selectedAuthor === author ? null : author;
  }
}
