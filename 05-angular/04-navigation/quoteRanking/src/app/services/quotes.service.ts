import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Author } from '../models';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private readonly base = 'http://localhost:8000/api/authors';

  constructor(private readonly http: HttpClient) { }

  postQuote(author_id: String, author: Author): Observable<Author> {
    return this.http.post<Author>(`${this.base}/quotes/${author_id}`, author)
  }

  deleteQuote(author_id, quote_id): Observable<Author> {
    return this.http.delete<Author>(`${this.base}/${author_id}/quotes/${quote_id}`)
  }

  editQuote(author_id, quote_id, change): Observable<Author> {
    return this.http.put<Author>(`${this.base}/${author_id}/quotes/${quote_id}`, { change });
  }
}
