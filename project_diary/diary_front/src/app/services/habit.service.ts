import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habit, HabitLog } from '../models/habit.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${this.baseUrl}habits/`);
  }

  createHabit(habit: Partial<Habit>): Observable<Habit> {
    return this.http.post<Habit>(`${this.baseUrl}habits/`, habit);
  }

  deleteHabit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}habits/${id}/`);
  }

  updateHabit(habit: Habit): Observable<Habit> {
    return this.http.put<Habit>(`${this.baseUrl}habits/${habit.id}/`, habit);
  }

  getLogs(): Observable<HabitLog[]> {
    return this.http.get<HabitLog[]>(`${this.baseUrl}logs/`);
  }

  createLog(log: Partial<HabitLog>): Observable<HabitLog> {
    return this.http.post<HabitLog>(`${this.baseUrl}logs/`, log);
  }

  updateLog(log: HabitLog): Observable<HabitLog> {
    return this.http.put<HabitLog>(`${this.baseUrl}logs/${log.id}/`, log);
  }
}
