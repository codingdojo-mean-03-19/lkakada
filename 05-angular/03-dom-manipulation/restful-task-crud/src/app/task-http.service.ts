import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {

  constructor(private readonly _http: HttpClient) { };

  getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>('/tasks');
  }
  addTask(newTask): Observable<Task> {
    return this._http.post<Task>('/tasks', newTask);
  }
  deleteTask(id: string): Observable<Task> {
    return this._http.delete<Task>(`/tasks/delete/${id}`);
  }
  updateTask(id: string, editTask): Observable<Task> {
    return this._http.put<Task>(`/tasks/update/${id}`, editTask);
  }
}
