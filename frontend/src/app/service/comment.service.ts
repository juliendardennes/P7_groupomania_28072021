import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from '../models/comment.model';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class CommentService {

    comment$ = new Subject<Comment[]>();
    private userId: string;
    private postId: string;

    constructor(private http: HttpClient,
                private auth: AuthService) {}

    createComment(comment: Comment) {
        return new Promise((resolve, reject) => {
           this.http.post('http://localhost:3000/api/comments', {
              content: comment.content,
              user_id: comment.userId,
              post_id: comment.postId,
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


    getComments() {
        this.http.get('http://localhost:3000/api/comments').subscribe(
          (comments: Comment[]) => {
            this.comment$.next(comments);
          },
          (error) => {
            this.comment$.next([]);
            console.error(error);
          }
        );
    }

    getCommentById(id: string) {
        return new Promise((resolve, reject) => {
          this.http.get('http://localhost:3000/api/comments/' + id).subscribe(
            (comment: Comment) => {
              resolve(comment);
            },
            (error) => {
              reject(error);
            }
          );
        });
      }
}