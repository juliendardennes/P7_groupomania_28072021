import { User } from "../models/User.model";
import { Subject } from "rxjs/Subject";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable()
export class UserService {

    private users: User[];
    userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }

  constructor(private httpClient: HttpClient) {}

    saveUsersToServer() {
        this.httpClient
        // .post('http://localhost:3000/api/auth/signup/users', this.users)
        .post('http://localhost:3000/api/auth/signup/users', this.users)
        .subscribe(
            () => {
                console.log('enregistrement terminé !');
            },
            (error) => {
                console.log('erreur de sauvegarde' + error);
            }
        )
    }

    // getUsersFromServer() {
    //   this.httpClient
    //     .get<any[]>('http://localhost:3000/api/auth/signup/users.json')
    //     .subscribe(
    //       (response) => {
    //         this.users = response;
    //         this.emitUsers();
    //       },
    //       (error) => {
    //         console.log('Erreur de chargement' + error);
    //       }
    //     );
    // }
}