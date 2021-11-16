import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Post } from 'src/app/models/post.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { PostListComponent } from '../post-list/post-list.component';
import { AuthService } from 'src/app/service/auth.service';

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
  loading; boolean;
  userId: string;
  isAdmin: boolean = false;

  constructor(private postsService: PostService, 
              private postListComponent: PostListComponent,
              private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.postsSubscription = this.postsService.post$.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.getPosts();
  }


  // userIsAdmin() {
  //   let admin = this.auth.getAdmin();
  //   if (admin === "true") {
  //     this.isAdmin = true;
  //   } else {
  //     this.isAdmin = false;
  //   }
  // }

  // ---------------------------


  onDelete() {
    this.loading = true;
    this.postsService.deletePost(this.post._id).then(
      (response: { message: string }) => {
        this.loading = false;
        console.log(response.message);
        // this.router.navigate(['/post-list']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }
}

