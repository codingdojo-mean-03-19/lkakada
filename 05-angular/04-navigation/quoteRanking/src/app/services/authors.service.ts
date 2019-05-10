import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Author } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private readonly base = 'http://localhost:8000/api/authors';

  constructor(private readonly http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.base);
  }
  getAuthor(id: String): Observable<Author> {
    return this.http.get<Author>(`${this.base}/${id}`)
  }
  postAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.base, author)
  }
  getUpdate(author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.base}/${author._id}`, author)
  }
}
