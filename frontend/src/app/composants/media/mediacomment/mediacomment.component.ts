import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mediaComment } from 'src/app/models/mediacomment.model';
import { AuthService } from 'src/app/service/auth.service';
import { mediaCommentService } from 'src/app/service/mediacomment.service';

@Component({
  selector: 'app-mediacomment',
  templateUrl: './mediacomment.component.html',
  styleUrls: ['./mediacomment.component.css']
})
export class MediacommentComponent implements OnInit {

  mediacommentForm: FormGroup;
  mode: string;
  loading: boolean;
  mediacomment: mediaComment;
  errorMsg: string;
  @Input()mediaPostId: string; 


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private mediacomments: mediaCommentService,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.mode = 'new';
          this.initMediaCommentForm();
          this.loading = false;
        } else {
          this.mode = 'edit';
          this.mediacomments.getMediaCommentById(params.id).then(
            (mediacomment: mediaComment) => {
              this.mediacomment = mediacomment;
              this.initModifyForm(mediacomment);
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
  
  initMediaCommentForm() {
    this.mediacommentForm = this.formBuilder.group({
      content: [null, Validators.required],
    });
  }

  initModifyForm(mediacomment: mediaComment) {
    this.mediacommentForm = this.formBuilder.group({
      content: [this.mediacomment.content, Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;
    const newMediaComment = new mediaComment();
    newMediaComment.content = this.mediacommentForm.get('content').value;
    newMediaComment.mediapostId = this.mediaPostId;
    newMediaComment.userId = JSON.parse(localStorage.getItem("user")).user_id;
    if (this.mode === 'new') {
      this.mediacomments.createMediaComment(newMediaComment).then(
        (response: { message: string }) => {
          this.loading = false;
          window.location.reload();
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
