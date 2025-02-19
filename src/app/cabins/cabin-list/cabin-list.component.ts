import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Cabin {
  id: number;
  name: string;
  nextVacantTime: string;
}

@Component({
  selector: 'app-cabin-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Fixed Imports
  template: `
    <div class="header">
      <h1>Available Cabins</h1>
      <button class="signout-button" (click)="signOut()">Sign Out</button>
    </div>

    <div class="cabin-container">
      <div class="cabin-grid">
        <div *ngFor="let cabin of cabins" class="cabin-card" [routerLink]="['/cabin', cabin.id]">
          <h2>{{ cabin.name }}</h2>
          <p>Next Available: {{ cabin.nextVacantTime }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #007bff;
      color: white;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }
    .signout-button {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    .cabin-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .cabin-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .cabin-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .cabin-card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class CabinListComponent implements OnInit {
  cabins: Cabin[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadCabins();
  }

  loadCabins() {
    this.http.get<Cabin[]>('http://localhost:8080/api/cabins').subscribe(
      (data) => { this.cabins = data; },
      (error) => { console.error("Error loading cabins:", error); }
    );
  }

  signOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
