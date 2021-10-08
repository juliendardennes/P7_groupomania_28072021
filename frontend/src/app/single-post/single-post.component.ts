import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/Post.model';
import { AuthService } from '../service/auth.service';
import { PostsService } from '../service/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  loading: boolean;
  post: Post;
  userId: string;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.postsService.getPostById(params.id).then(
          (post: Post) => {
            this.post = post;
            this.loading = false;
          }
        );
      }
    );
    this.userId = this.auth.getUserId();
  }
  onBack() {
    this.router.navigate(['/posts']);
  }

  onModify() {
    this.router.navigate(['/modify-sauce', this.post._id]);
  }

  onDelete() {
    this.loading = true;
    this.postsService.deletePost(this.post._id).then(
      (response: { message: string }) => {
        console.log(response.message);
        this.loading = false;
        this.router.navigate(['/posts']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
        console.error(error);
      }
    );
  }
}
