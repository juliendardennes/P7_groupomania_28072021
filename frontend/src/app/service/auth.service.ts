import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
    isAuth$ = new BehaviorSubject<boolean>(false);
    private userId: string;
    private authToken: string;

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

                // -----se connecter-----

    loginUser(email: string, password) {
        return new Promise((resolve, reject) => {
          this.httpClient.post('http://localhost:3000/api/auth/login', {email: email, password: password}).subscribe(
            (response: {userId: string, token: string}) => {
              this.userId = response.userId;
              this.authToken = response.token;
              this.isAuth$.next(true);
              resolve(response);
              localStorage.setItem( "user", JSON.stringify(response) );
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
      getToken() {
        return this.authToken;
      }

    logout(): void {
        console.log('Déconnecté!')
        localStorage.clear();
        this.isAuth$.next(false);
        this.router.navigate(['login']);
    }

}
