import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Note } from '../models';
import { NgForm } from '@angular/forms';

import { NoteService } from '../services';


@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  note = new Note();
  // errors: String[] = [];

  constructor(private readonly noteService: NoteService, private readonly router: Router) { }

  @Output()
  newNote = new EventEmitter<Note>();
  @Input() errors = [];

  ngOnInit() {
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault()
    console.log("Submitting note", this.note);
    this.note = form.value;
    this.newNote.emit(this.note);

    // this.note = new Note();
    form.reset();
  }

  // private handleErrors(errors: string[] | string) {
  //   this.errors = Array.isArray(errors) ? errors : [errors];
  // }
}
