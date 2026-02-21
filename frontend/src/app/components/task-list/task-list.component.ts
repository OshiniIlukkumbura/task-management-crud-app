import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  displayedColumns: string[] = ['index', 'title', 'description', 'status', 'priority', 'actions'];
  tasksLoaded = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef, // ← inject it
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksLoaded = false;
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.tasksLoaded = true;
        this.cdr.detectChanges(); // ← tell Angular to re-check NOW
      },
      error: () => {
        this.tasksLoaded = true;
        this.cdr.detectChanges();  // ← tell Angular to re-check NOW
        this.snackBar.open('Failed to load tasks!', 'Close', { duration: 3000 });
      },
    });
  }
  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.snackBar.open('Task deleted successfully!', 'Close', { duration: 3000 });
          this.loadTasks();
        },
        error: () => {
          this.snackBar.open('Failed to delete task!', 'Close', { duration: 3000 });
        },
      });
    }
  }

  editTask(id: number): void {
    this.router.navigate(['/tasks/edit', id]);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'DONE':
        return 'primary';
      case 'IN_PROGRESS':
        return 'accent';
      default:
        return '';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'HIGH':
        return 'warn';
      case 'MEDIUM':
        return 'accent';
      default:
        return 'primary';
    }
  }
}
