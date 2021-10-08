import { Component, OnInit } from '@angular/core';
import { PostsService } from '../service/post.service';
import { Subscription } from 'rxjs';
import { Post } from '../models/Post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postSub: Subscription;
  posts: Post[];
  loading: boolean;
  errorMsg: string;

  constructor(private post: PostsService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.postSub = this.post.postSubject.subscribe(
      (posts) => {
        this.posts = posts;
        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.post.getPosts();
  }

  onClickPost(id: string) {
    this.router.navigate(['post', id]);
  }

}