import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/Post.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
    postSubject = new Subject<Post[]>();

    constructor(private http: HttpClient,
        private auth: AuthService) {}

getPosts() {
    this.http.get('http://localhost:3000/api/posts').subscribe(
        (posts: Post[]) => {
            this.postSubject.next(posts);
        },
        (error) => {
            this.postSubject.next([]);
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

createPost(post: Post, image: File) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('post', JSON.stringify(post));
        formData.append('image', image);
        this.http.post('http://localhost:3000/api/posts', formData).subscribe(
            (response: { message: string }) => {
                resolve(response);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

modifyPost(id: string, post: Post, image: string | File) {
    return new Promise((resolve, reject) => {
        if (typeof image === 'string') {
            this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe(
                (response: { message: string }) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            const formData = new FormData();
            formData.append('post', JSON.stringify(post));
            formData.append('image', image);
            this.http.put('http://localhost:3000/api/posts/' + id, formData).subscribe(
                (response: { message: string }) => {
                    resolve(response);
                },
                (error) => {
                    reject(error);
                }
            );
        }
    });
}

deletePost(id: string) {
    return new Promise((resolve, reject) => {
        this.http.delete('http://localhost:3000/api/posts/' + id).subscribe(
            (response: { message: string }) => {
                resolve(response);
            },
            (error) => {
                reject(error);
            }
        );
    });
    }
}

