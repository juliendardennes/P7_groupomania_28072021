import { Component, OnInit } from '@angular/core';
import { mediaPostService } from 'src/app/service/mediaPost.service';
import { mediaPost } from 'src/app/models/mediaPost.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mediapost-single',
  templateUrl: './mediapost-single.component.html',
  styleUrls: ['./mediapost-single.component.css']
})
export class MediapostSingleComponent implements OnInit {

  mediapost: mediaPost;
  mediaposts: mediaPost[];
  mediapostsSubscription: Subscription;

  constructor(private mediaPostsService: mediaPostService,
              private router: Router) { }

  ngOnInit() {
    this.mediapostsSubscription = this.mediaPostsService.mediaPost$.subscribe(
      (mediaposts: mediaPost[]) => {
        this.mediaposts = mediaposts;
      }
    );
    this.mediaPostsService.getMediaPosts();
  }

}
