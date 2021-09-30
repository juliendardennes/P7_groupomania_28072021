import { User } from "../models/User.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient,
                private router: Router) {}

                // -----s'inscrire-----
    saveUsersToServer(user: User) {
        this.httpClient
        .post('http://localhost:3000/api/auth/signup', user)
        .subscribe(
            (response) => {
                console.log('enregistrement terminé !');
            },
            (error) => {
                console.log('erreur de sauvegarde');
            }
        )
    }
                // -----se connecter-----
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
            },
            (error) => {
                console.log("error")
            }
        );
    }
        

}