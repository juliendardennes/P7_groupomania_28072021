import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
    
    isAuth$ = new BehaviorSubject<boolean>(false);
    private userId: string;

    constructor(private httpClient: HttpClient,
                private router: Router) {}


                // -----s'inscrire-----
    createNewUser(email: string, password: string, firstName: string, lastName: string) {
        return new Promise((resolve, reject) => {
            this.httpClient.post('http://localhost:3000/api/auth/signup', {
                email: email, 
                password: password,
                firstName: firstName,
                lastName: lastName
            }).subscribe(
            (response: { message: string }) => {
                resolve(response);
            },
            (error) => {
                reject(error);
            }
            );
        });
    }

    getUserId() {
        return this.userId;
      }

                // -----se connecter-----

    loginUser(email: string, password: string) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.post('http://localhost:3000/api/auth/login', {
                    email: email, 
                    password: password
                }).subscribe(
                    (response: { message: string }) => {
                        resolve(response);
                        localStorage.setItem( "token", JSON.stringify(response) );
                    },
                    (error) => {
                        reject(error);
                    }
                )
            }
        )
    }
               
    // // bouton de déconnexion - suppression token du localstorage- retour formulaire de connexion
    // logout() {
    //     localStorage.clear();
    //     this.router.navigate(['login']);
    //   }

}
