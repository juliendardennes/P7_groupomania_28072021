import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class PostService {

    post$ = new Subject<Post[]>();
    private userId: string;

    constructor(private http: HttpClient,
                private auth: AuthService) {}

    createPost(post: Post) {
        return new Promise((resolve, reject) => {
           this.http.post('http://localhost:3000/api/posts', {
              title: post.title,
              content: post.content,
              user_id: post.userId,
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


    getPosts() {
        this.http.get('http://localhost:3000/api/posts').subscribe(
          (posts: Post[]) => {
            this.post$.next(posts);
          },
          (error) => {
            this.post$.next([]);
            console.error(error);
          }
        );
    }

    getPostById(id: string) {
        return new Promise((resolve, reject) => {
          this.http.get('http://localhost:3000/api/posts/' + id).subscribe(
            (post: Post) => {
              resolve(post);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }

      deletePost(id: string) {
        return new Promise((resolve, reject) => {
          this.http.delete('http://localhost:3000/api/posts/' + id).subscribe(
            (response: {message: string}) => {
              resolve(response);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
}
