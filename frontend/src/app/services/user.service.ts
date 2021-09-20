import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })

export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createUser(newUser: User) {
    return this.http.post('http://localhost:3000/api/auth/signup', newUser);
  }
}
