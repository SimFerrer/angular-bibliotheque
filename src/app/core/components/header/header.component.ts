import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  authenticated : boolean = false;
  constructor(private authService : AuthService, private router : Router){}
  ngOnInit(): void {
    this.authenticated = this.authService.isAuthenticated();
    console.log(this.authenticated)
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']).then(()=>{
      window.location.reload();
    });
  }

}
