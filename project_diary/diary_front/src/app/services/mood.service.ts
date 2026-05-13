import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoodEntry } from '../models/mood-entry.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  private apiUrl = 'http://127.0.0.1:8000/api/moods/';

  constructor(private http: HttpClient) {}

  getMoods(): Observable<MoodEntry[]> {
    return this.http.get<MoodEntry[]>(this.apiUrl);
  }

  addMood(mood: MoodEntry): Observable<MoodEntry> {
    return this.http.post<MoodEntry>(this.apiUrl, mood);
  }
}
