import { Component, OnInit } from '@angular/core';
import { Task } from './models';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'restful-task';
  tasks: Task[] = [];
  task = {};
  selectedTask: Task;
  constructor(private readonly taskService: HttpService) {
  }
  ngOnInit() {

  }
  getTasksFromService() {
    let observable = this.taskService.getTasks()
    observable.subscribe(tasks => {
      this.tasks = tasks;
      console.log("Got our data - tasks: ", tasks);
      console.log("Got our data - ", this.tasks);
    })
  }
  getTaskDetail(id: string): void {
    let observable = this.taskService.getTaskDetail(id)
    observable.subscribe(task => {
      this.selectedTask = task;
    })
  }
}
