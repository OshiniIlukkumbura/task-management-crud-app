import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
  };

  isEditMode = false;
  taskId!: number;
  isSubmitting = false;
  taskLoaded = false;

  statusOptions = ['TODO', 'IN_PROGRESS', 'DONE'];
  priorityOptions = ['LOW', 'MEDIUM', 'HIGH'];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef, 
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];

    if (idParam) {
      this.isEditMode = true;
      this.taskId = +idParam;

      this.taskService.getTaskById(this.taskId).subscribe({
        next: (data) => {
          this.task = { ...data };
          this.taskLoaded = true;
          this.cdr.detectChanges(); // ← force Angular to update NOW
        },
        error: () => {
          this.taskLoaded = true;
          this.cdr.detectChanges(); // ← force Angular to update NOW
          this.snackBar.open('Failed to load task!', 'Close', { duration: 3000 });
          this.router.navigate(['/tasks']);
        },
      });
    } else {
      this.taskLoaded = true;
      this.cdr.detectChanges();
    }
  }

  onSubmit(): void {
    this.isSubmitting = true;
    const action = this.isEditMode
      ? this.taskService.updateTask(this.taskId, this.task)
      : this.taskService.createTask(this.task);

    action.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEditMode ? 'Task updated successfully!' : 'Task created successfully!',
          'Close',
          { duration: 3000 },
        );
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.snackBar.open('Something went wrong!', 'Close', { duration: 3000 });
        this.isSubmitting = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
