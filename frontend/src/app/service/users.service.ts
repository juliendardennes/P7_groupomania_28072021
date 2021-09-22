import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UsersService {

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {} 

    login() {
        alert("tete")
        var data = {
            "email":  "toto@toto.com",
            "password": "toto"
        };
        var headers = new HttpHeaders({
            "Content-Type": "application/json"
        })
        this.httpClient.post('http://localhost:3000/api/auth/login', data, {
            headers: headers
        })
        .subscribe(
            (response) => {
                console.log(response)
            },
            (error) => {
                console.log("error")
            }
        );
    }

}