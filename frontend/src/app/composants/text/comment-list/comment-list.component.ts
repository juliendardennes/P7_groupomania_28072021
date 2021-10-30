import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';
import { Comment } from 'src/app/models/comment.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  comments: Comment[];
  commentsSubscription: Subscription;
  @Input()postId: string;

  constructor(private commentsService: CommentService, 
              private router: Router) {}

  ngOnInit() {
    this.commentsSubscription = this.commentsService.comment$.subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      }
    );
    this.commentsService.getComments();
    
  }

}
