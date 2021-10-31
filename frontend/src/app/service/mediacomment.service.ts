import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { mediaComment } from '../models/mediacomment.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class mediaCommentService {

    mediaComment$ = new Subject<mediaComment[]>();
    private userId: string;
    private mediapostId: string;

    constructor(private http: HttpClient,
                private router: Router,
                private auth: AuthService) {}

    createMediaComment(mediacomment: mediaComment) {
        return new Promise((resolve, reject) => {
           this.http.post('http://localhost:3000/api/commentMedia', {
              content: mediacomment.content,
              user_id: mediacomment.userId,
              mediapost_id: mediacomment.mediapostId,
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


    getMediaComments() {
        this.http.get('http://localhost:3000/api/commentMedia').subscribe(
          (mediacomments: mediaComment[]) => {
            this.mediaComment$.next(mediacomments);
          },
          (error) => {
            this.mediaComment$.next([]);
            console.error(error);
          }
        );
    }

    getMediaCommentById(id: string) {
        return new Promise((resolve, reject) => {
          this.http.get('http://localhost:3000/api/commentMedia/' + id).subscribe(
            (mediacomment: mediaComment) => {
              resolve(mediacomment);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
}