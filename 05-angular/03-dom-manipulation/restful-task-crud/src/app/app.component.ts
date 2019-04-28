import { Component, OnInit } from '@angular/core';
import { Task } from './models';
import { TaskHttpService } from './task-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'restful-task-crud';
  tasks: Task[] = [];
  newTask: any;
  editTask: any;
  editStatus: boolean;
  constructor(private readonly taskService: TaskHttpService) {
  }
  ngOnInit(): void {
    this.getTasks();
    this.newTask = { title: "", description: "" };
  }
  onSubmit() {
    let observable = this.taskService.addTask(this.newTask)
    observable.subscribe(task => {
      console.log("Task has been added successfully.", task);
      this.getTasks();
      this.newTask = { title: "", description: "" };
    });
  }
  getTasks() {
    let observable = this.taskService.getTasks()
    observable.subscribe(tasks => {
      this.tasks = tasks
    });
    this.editStatus = false;
  }
  onDelete(id: string) {
    let observable = this.taskService.deleteTask(id)
    observable.subscribe(task => {
      console.log('Task has been deleted successfully.', task);
      this.getTasks();
    });
  }
  onEdit(task: Task) {
    console.log(task);
    this.editTask = task;
    this.editStatus = true;
  }
  onUpdate() {
    let observable = this.taskService.updateTask(this.editTask._id, this.editTask)
    observable.subscribe(task => {
      console.log('Task has been updated successfully.', task);
      this.getTasks();
      this.editStatus = false;
    })
  }
}
