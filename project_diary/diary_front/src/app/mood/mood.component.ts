import { Component, OnInit } from '@angular/core';
import { MoodService } from '../services/mood.service';
import { MoodEntry } from '../models/mood-entry.model';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css'],
  imports:[CommonModule,FormsModule],
})
export class MoodComponent implements OnInit {
  moods: MoodEntry[] = [];
  newMood: MoodEntry = { mood: '', note: '' };
  chart: any;
  constructor(private moodService: MoodService) {}

  ngOnInit() {
    this.loadMoods();
  }

  loadMoods() {
    this.moodService.getMoods().subscribe(data => {
      this.moods = data;
      this.updateChart();
    });
  }

  saveMood() {
    const moodToSend = {
      mood: this.newMood.mood,
      note: this.newMood.note
    };
    this.moodService.addMood(moodToSend).subscribe(() => {
      this.newMood = { date: '', mood: '', note: '' };
      this.loadMoods();
    });
  }

  updateChart() {
    const ctx = document.getElementById('moodChart') as HTMLCanvasElement;
    
    if (this.chart) {
      this.chart.destroy();
    }
      const moodByDate: { [date: string]: { [mood: string]: number } } = {};
    
    this.moods.forEach(entry => {
  
      if (!entry.date) return;
      
      if (!moodByDate[entry.date]) {
        moodByDate[entry.date] = {};
      }
      

      if (!moodByDate[entry.date][entry.mood]) {
        moodByDate[entry.date][entry.mood] = 0;
      }
      
      moodByDate[entry.date][entry.mood]++;
    });
  
    
    const allMoods = Array.from(new Set(this.moods
      .filter(entry => entry.mood) 
      .map(entry => entry.mood)
    ));
  

    const datasets = allMoods.map(mood => {
      return {
        label: mood,
        data: Object.keys(moodByDate)
          .sort()
          .map(date => moodByDate[date][mood] || 0), 
        backgroundColor: this.getRandomColor(),
        borderColor: this.getRandomColor(),
        borderWidth: 2
      };
    });
  

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(moodByDate).sort(),
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Количество записей'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Дата'
            }
          }
        }
      }
    });
  }
  

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
