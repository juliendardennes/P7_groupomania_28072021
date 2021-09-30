import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {} 

        

    login() {
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
                localStorage.setItem( "token", JSON.stringify(response) );
                console.log(response)
            },
            (error) => {
                console.log("error")
            }
        );
    }

}