import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private AuthService: AuthService,
              private router : Router) { }

  ngOnInit() {
  }
  onLogin() {
    this.AuthService.login();      
  };
}

