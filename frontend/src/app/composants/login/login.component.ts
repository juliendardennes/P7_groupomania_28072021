import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private usersService: UsersService) {
  }
  ngOnInit() {
    console.log("titi")
  }
  submit() {
    alert("toto");
    this.usersService.login();
  }
}
