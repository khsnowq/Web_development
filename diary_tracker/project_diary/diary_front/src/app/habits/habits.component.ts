import { Component, OnInit } from '@angular/core';
import { HabitService } from '../services/habit.service';
import { Habit } from '../models/habit.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habits',
  styleUrls:['./habits.component.css'],
  templateUrl: './habits.component.html',
  imports:[CommonModule,FormsModule]
})
export class HabitsComponent implements OnInit {
  habits: Habit[] = [];
  newHabit: Partial<Habit> = { name: '', frequency: 'daily' };

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.loadHabits();
  }

  loadHabits() {
    this.habitService.getHabits().subscribe(data => this.habits = data);
  }

  addHabit() {
    this.habitService.createHabit(this.newHabit).subscribe(() => {
      this.loadHabits();
      this.newHabit = { name: '', frequency: '' };
    });
  }

  deleteHabit(id: number) {
    this.habitService.deleteHabit(id).subscribe(() => this.loadHabits());
  }
  toggleHabit(habit: Habit) {
    habit.completed = !habit.completed;
    this.habitService.updateHabit(habit).subscribe(); 
  }
  
}
