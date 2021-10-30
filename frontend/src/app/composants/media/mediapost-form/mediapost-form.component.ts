import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mediaPost } from 'src/app/models/mediaPost.model';
import { AuthService } from 'src/app/service/auth.service';
import { mediaPostService } from 'src/app/service/mediaPost.service';

@Component({
  selector: 'app-mediapost-form',
  templateUrl: './mediapost-form.component.html',
  styleUrls: ['./mediapost-form.component.css']
})
export class MediapostFormComponent implements OnInit {

  mediaPostForm: FormGroup;
  mode: string;
  loading: boolean;
  mediapost: mediaPost;
  errorMsg: string;
  imagePreview: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private mediaposts: mediaPostService,
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
          this.mediaposts.getMediaPostById(params.id).then(
            (mediapost: mediaPost) => {
              this.mediapost = mediapost;
              this.initModifyForm(mediapost);
              this.loading = false;
            }
          ) .catch(
            (error) => {
              this.errorMsg = JSON.stringify(error);
            }
          );
        }
      }
    );
  }

  initEmptyForm() {
    this.mediaPostForm = this.formBuilder.group({
      userId: [null, Validators.required],
      media: [null, Validators.required],
    });
  }

  initModifyForm(mediapost: mediaPost) {
    this.mediaPostForm = this.formBuilder.group({
      userId: [this.mediapost.userId, Validators.required],
      media: [this.mediapost.media, Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    const newMediaPost = new mediaPost;
    newMediaPost.media = this.mediaPostForm.get('media').value;
    newMediaPost.userId = JSON.parse(localStorage.getItem("user")).user_id;
    if (this.mode === 'new') {
      this.mediaposts.createMediaPost(newMediaPost).then(
        (response: {message: string }) => {
          this.loading = false;
          window.location.reload();
          this.router.navigate(['mediapost-list']);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      );
    }
  }
}
