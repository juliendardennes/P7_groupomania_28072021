import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/service/auth.service';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentForm: FormGroup;
  mode: string;
  comment: Comment;
  errorMsg: string;
  @Input()postId: string; 


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private comments: CommentService,
              private auth: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.mode = 'new';
          this.initCommentForm();
        } else {
          this.mode = 'edit';
          this.comments.getCommentById(params.id).then(
            (comment: Comment) => {
              this.comment = comment;
              this.initModifyForm(comment);
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
  
  initCommentForm() {
    this.commentForm = this.formBuilder.group({
      content: [null, Validators.required],
    });
  }

  initModifyForm(comment: Comment) {
    this.commentForm = this.formBuilder.group({
      content: [this.comment.content, Validators.required],
    });
  }

  onSubmit() {
    const newComment = new Comment();
    newComment.content = this.commentForm.get('content').value;
    newComment.postId = this.postId;
    newComment.userId = JSON.parse(localStorage.getItem("user")).user_id;
    if (this.mode === 'new') {
      this.comments.createComment(newComment).then(
        (response: { message: string }) => {
          window.location.reload();
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
