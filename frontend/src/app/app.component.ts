import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <mat-icon style="margin-right: 10px;">assignment</mat-icon>
      <span>Task Management System</span>
      <span style="flex: 1;"></span>
      <button mat-button routerLink="/tasks"><mat-icon>list</mat-icon> Tasks</button>
      <button mat-raised-button routerLink="/tasks/new" style="margin-left: 10px;">
        <mat-icon>add</mat-icon> New Task
      </button>
    </mat-toolbar>
    <div style="padding: 24px;">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
