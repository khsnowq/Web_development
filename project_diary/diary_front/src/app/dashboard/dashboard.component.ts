import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports:[CommonModule,RouterModule],
})
export class DashboardComponent {
  constructor(private authService:AuthService){
    
  }
  logout() {
    this.authService.logout();
  }
}
