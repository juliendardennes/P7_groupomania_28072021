import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../service/post.service';
import { Post } from '../models/Post.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  mode: string;
  loading: boolean;
  post: Post;
  errorMsg: string;
  imagePreview: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private posts: PostsService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.mode = 'new';
          this.initEmptyForm();
          this.loading = false;
        } else {
          this.mode = 'edit';
          this.posts.getPostById(params.id).then(
            (post: Post) => {
              this.post = post;
              this.initModifyForm(post);
              this.loading = false;
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
      content: [null, Validators.required]
    });
  }

  initModifyForm(post: Post) {
    this.postForm = this.formBuilder.group({
      title: [this.post.title, Validators.required],
      content: [this.post.content, Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    const newPost = new Post();
    newPost.title = this.postForm.get('title').value;
    newPost.content = this.postForm.get('content').value;
    
  }

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.get('image').setValue(file);
    this.postForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}