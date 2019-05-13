import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly base = "/api/teams";

  constructor(private readonly http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.base);
  }
  postTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.base}`, team);
  }
  deleteTeam(id: string): Observable<Team> {
    return this.http.delete<Team>(`${this.base}/${id}`);
  }
  updateTeam(team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.base}/${team._id}`, team);
  }
}
