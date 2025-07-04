import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-teamlead-dashboard',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './teamlead-dashboard.component.html',
  styleUrl: './teamlead-dashboard.component.css',
})
export class TeamleadDashboardComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}
  logout() {
    localStorage.removeItem('teamlead');
    this.router.navigateByUrl('teamleadlogin');
  }
}
