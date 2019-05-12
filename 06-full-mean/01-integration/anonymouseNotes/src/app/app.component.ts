import { Component, OnInit } from '@angular/core';
import { NoteService } from './services';
import { Note } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'anonymouseNotes';
  notes: Note[] = [];
  errors: String[] = [];

  constructor(private readonly noteService: NoteService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  createNote(note: Note) {
    this.noteService.postNote(note)
      .subscribe(newNote => {
        this.notes = [newNote, ...this.notes];
      },
        error => {
          this.handleErrors(error);
        })
  }

  getNotes() {
    this.noteService.getNotes()
      .subscribe(notes => {
        this.notes = notes;
      })
  }

  private handleErrors(errors: string[] | string) {
    this.errors = Array.isArray(errors) ? errors : [errors];
  }

}
