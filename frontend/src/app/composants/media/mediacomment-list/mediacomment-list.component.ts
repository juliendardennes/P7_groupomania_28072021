import { Component, OnInit, Input } from '@angular/core';
import { mediaCommentService } from 'src/app/service/mediacomment.service';
import { mediaComment } from 'src/app/models/mediacomment.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mediacomment-list',
  templateUrl: './mediacomment-list.component.html',
  styleUrls: ['./mediacomment-list.component.css']
})
export class MediacommentListComponent implements OnInit {

  mediacomments: mediaComment[];
  mediacommentsSubscription: Subscription;
  @Input()mediapostId: string;

  constructor(private mediacommentsService: mediaCommentService, 
              private router: Router) {}

  ngOnInit() {
    this.mediacommentsSubscription = this.mediacommentsService.mediaComment$.subscribe(
      (mediacomments: mediaComment[]) => {
        this.mediacomments = mediacomments;
      }
    );
    this.mediacommentsService.getMediaComments();
    
  }

}
