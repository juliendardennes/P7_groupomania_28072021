import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/service/auth.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  mode: string;
  post: Post;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private posts: PostService,
              private auth: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.mode = 'new';
          this.initEmptyForm();
        } else {
          this.mode = 'edit';
          this.posts.getPostById(params.id).then(
            (post: Post) => {
              this.post = post;
              this.initModifyForm(post);
            }
          ).catch(
            (error) => {
              this.errorMsg = JSON.stringify(error);
            }
          );
        }
      }
    );
  }

  initEmptyForm() {
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  initModifyForm(post: Post) {
    this.postForm = this.formBuilder.group({
      title: [this.post.title, Validators.required],
      content: [this.post.content, Validators.required],
    });
  }

  onSubmit() {
    const newPost = new Post();
    newPost.title = this.postForm.get('title').value;
    newPost.content = this.postForm.get('content').value;
    newPost.userId = JSON.parse(localStorage.getItem("user")).user_id;
    if (this.mode === 'new') {
      this.posts.createPost(newPost).then(
        (response: { message: string }) => {
          window.location.reload();
          this.router.navigate(['post-list']);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.errorMsg = error.message;
        }
      );
    } 
  }
}
