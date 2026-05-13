import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css'],
  imports:[CommonModule,FormsModule],
})
export class TaskManagerComponent implements OnInit, AfterViewInit {
  tasks: Task[] = [];
  newTask: Task = {
    name: '',
    description: '',
    date: '',
    status: 'todo'
  };

  constructor(private taskService: TaskService) {}
  ngAfterViewInit() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth'
      });
      calendar.render();
    }
  }
  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
  }

  addTask() {
    if (this.newTask.name && this.newTask.date) {
      this.taskService.addTask(this.newTask).subscribe(() => {
        this.newTask = { name: '', description: '', date: '', status: 'todo' };
        this.loadTasks();
      });
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  get calendarEvents() {
    return this.tasks.map(task => ({
      name: task.name,
      date: task.date,
      backgroundColor: task.status === 'todo' ? '#22c55e' : '#3b82f6'
    }));
  }
}
