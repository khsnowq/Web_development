import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MoodComponent } from './mood/mood.component';
import { HabitsComponent } from './habits/habits.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'mood', component: MoodComponent, canActivate: [AuthGuard] },
  { path: 'habit', component: HabitsComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskManagerComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '' }
];
