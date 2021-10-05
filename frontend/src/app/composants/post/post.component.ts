
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostFormComponent implements OnInit {


  constructor() { }

  ngOnInit() {}

  // bouton pour publier un post
  onSubmit() {
    console.log('posté !!')
  }

}

  