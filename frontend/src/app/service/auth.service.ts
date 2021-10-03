import { User } from "../models/User.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { Observable, observable } from "rxjs";


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
                console.log('inscription terminé !');
            },
            (error) => {
                console.log("erreur à l'inscription !");
            }
        )
    }
                // -----se connecter-----
               
    login(data):Observable<any>{
        // var headers = new HttpHeaders({"Content-Type": "application/json" })
        return this.httpClient.post('http://localhost:3000/api/auth/login',data)
    }

  

    // login() {
    //     var data = {
    //         "email":  "toto@toto.com",
    //         "password": "toto"
    //     };
    //     var headers = new HttpHeaders({
    //         "Content-Type": "application/json"
    //     })
    //     this.httpClient.post('http://localhost:3000/api/auth/login', data, { headers: headers })
    //     .subscribe(
    //         (response) => {
    //             console.log(response)
    //             localStorage.setItem( "token", JSON.stringify(response) );

    //         },
    //         (error) => {
    //             console.log("error")
    //         }
    //     );
    // }
    
    
}
