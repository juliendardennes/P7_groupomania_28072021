import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/models/post.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { PostListComponent } from '../post-list/post-list.component';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css']
})
export class PostSingleComponent implements OnInit {

  post: Post;
  posts: Post[];
  postsSubscription: Subscription;
  errorMsg: string;

  constructor(private postsService: PostService, 
              private postListComponent: PostListComponent,
              private router: Router) {}

  ngOnInit() {
    this.postsSubscription = this.postsService.post$.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.getPosts();
  }

  deletePost(){
    
  }

}