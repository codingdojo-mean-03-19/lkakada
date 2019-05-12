import { Injectable } from '@angular/core';
import { Note } from '../models';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly base = 'http://localhost:8000/api/notes';

  constructor(private readonly http: HttpClient) { }
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.base);
  }
  postNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.base, note)
  }
}
