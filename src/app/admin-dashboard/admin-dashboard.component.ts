import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}
  logout() {
    localStorage.removeItem('admin');
    this.router.navigateByUrl('adminlogin');
  }
}
