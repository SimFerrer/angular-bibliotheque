import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isAuthenticated$! : Observable<boolean>;
  constructor(private authService : AuthService, private router : Router){}
  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
