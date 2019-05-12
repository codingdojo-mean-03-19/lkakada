import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-note',
  templateUrl: './list-note.component.html',
  styleUrls: ['./list-note.component.css']
})
export class ListNoteComponent implements OnInit {
  // notes: Note[];
  constructor() { }

  @Input() notes = [];

  ngOnInit() {
  }

}
