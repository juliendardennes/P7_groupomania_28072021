import { User } from "../models/User.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {}

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

  
}