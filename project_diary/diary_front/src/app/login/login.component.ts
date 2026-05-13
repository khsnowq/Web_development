import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[CommonModule,FormsModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        const token = response.access;
        console.log('Получен токен:', token);
        if (token) {
          this.authService.saveToken(token);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Токен не получен';
        }
      },
      error: () => {
        this.errorMessage = 'Неверный логин или пароль';
      }
    });
  }
}
