import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../../shared/loading.component'; // ✅ Fixed import path

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LoadingComponent], // ✅ Corrected imports
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <h2>Login</h2>
        
        <!-- Show loading indicator if request is in progress -->
        <app-loading *ngIf="isLoading"></app-loading>

        <form (ngSubmit)="onSubmit()">
          <input type="text" [(ngModel)]="username" name="username" placeholder="Username" required>
          <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
          <button type="submit" [disabled]="isLoading">Login</button>
        </form>

        <p>Don't have an account? <a routerLink="/signup">Sign up</a></p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .auth-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      margin: 0.5rem 0;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    button:disabled {
      background-color: #a0a0a0;
      cursor: not-allowed;
    }
    p {
      margin-top: 1rem;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false; // ✅ Added loading state

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.isLoading = true; // ✅ Start loading

    this.http.post('http://localhost:8080/api/auth/login', { username: this.username, password: this.password })
      .subscribe(
        (response) => {
          console.log('Login successful', response);
          this.isLoading = false; // ✅ Stop loading
          this.router.navigate(['/cabins']);
        },
        (error) => {
          console.error('Login failed', error);
          alert('Invalid credentials');
          this.isLoading = false; // ✅ Stop loading on error
        }
      );
  }
}
