import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';
import { User } from '../models/User.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    // posts: Post[] = [];
    post$ = new Subject<Post[]>();
    id = sessionStorage.getItem('post_id');
    user_id = sessionStorage.getItem('user_id');
    user: User;
    
    constructor(private http: HttpClient,
                private auth: AuthService) {}

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

    // getPostById(id: string) {
    //   return new Promise((resolve, reject) => {
    //     this.http.get('http://localhost:3000/api/posts/' + id).subscribe(
    //       (post: Post) => {
    //         resolve(post);
    //       },
    //       (error) => {
    //         reject(error);
    //       }
    //     );
    //   });
    // }

    createPost(title: string, content: string) {
        return new Promise((resolve, reject) => {
           this.http.post('http://localhost:3000/api/posts', {
              title: title,
              content: content,
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
          this.http.delete('http://localhost:3000/api/posts/' +id).subscribe(
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
