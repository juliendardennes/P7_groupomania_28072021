import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { mediaPost } from '../models/mediaPost.model';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class mediaPostService {

    mediaPost$ = new Subject<mediaPost[]>();
    private userId: string;

    constructor(private http: HttpClient,
                private auth: AuthService) {}

    createMediaPost(media: File, userId: string) {
      let formdata = new FormData();
      formdata.append('image', media);
      formdata.append('user_id',userId);
        return new Promise((resolve, reject) => {
           this.http.post('http://localhost:3000/api/mediapost', formdata
            ).subscribe(
            (response: { message: string }) => {
                resolve(response);
            },
            (error) => {
                reject(error);
            }
            );
        });
    }


    getMediaPosts() {
        this.http.get('http://localhost:3000/api/mediapost').subscribe(
          (mediaPosts: mediaPost[]) => {
            this.mediaPost$.next(mediaPosts);
          },
          (error) => {
            this.mediaPost$.next([]);
            console.error(error);
          }
        );
    }

    getMediaPostById(id: string) {
        return new Promise((resolve, reject) => {
          this.http.get('http://localhost:3000/api/mediapost/' + id).subscribe(
            (mediapost: mediaPost) => {
              resolve(mediapost);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
}