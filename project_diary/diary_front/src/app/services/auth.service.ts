import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient,
    private router:Router
  ) {}

  login(username: string, password: string) {
    return this.http.post('http://localhost:8000/api/token/', { username, password });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
