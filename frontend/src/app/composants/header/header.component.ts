import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    
        let token = this.auth.getToken();
        if (token == null) {
          this.isAuth = false;
        } else {
          this.isAuth = true;
        }
      }
    
  

  signOut(): void {
    this.auth.logout();
  }

}
