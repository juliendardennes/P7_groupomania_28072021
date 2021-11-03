import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { PostService } from './service/post.service';
import { AuthInterceptor } from './auth-interceptor';
import { CommentService } from './service/comment.service';


import { HeaderComponent } from './composants/header/header.component';
import { SignupComponent } from './composants/auth/signup/signup.component';
import { LoginComponent } from './composants/auth/login/login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostFormComponent } from './composants/text/post-form/post-form.component';
import { PostListComponent } from './composants/text/post-list/post-list.component';
import { CommentComponent } from './composants/text/comment/comment.component';
import { CommentListComponent } from './composants/text/comment-list/comment-list.component';
import { PostSingleComponent } from './composants/text/post-single/post-single.component';
import { mediaPostService } from './service/mediaPost.service';
import { MediapostListComponent } from './composants/media/mediapost-list/mediapost-list.component';
import { MediapostFormComponent } from './composants/media/mediapost-form/mediapost-form.component';
import { MediapostSingleComponent } from './composants/media/mediapost-single/mediapost-single.component';
import { MediacommentListComponent } from './composants/media/mediacomment-list/mediacomment-list.component';
import { MediacommentComponent } from './composants/media/mediacomment/mediacomment.component';
import { mediaComment } from './models/mediacomment.model';
import { mediaCommentService } from './service/mediacomment.service';
import { ProfilComponent } from './composants/profil/profil.component';

const appRoutes: Routes = [
  { path: '', component: PostListComponent},
  { path: 'profil', component: ProfilComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'post-form', component: PostFormComponent},
  { path: 'post-single', component: PostSingleComponent},
  { path: 'post-list', component: PostListComponent},
  { path: 'comment', component: CommentComponent}, 
  { path: 'comment-list', component: CommentListComponent},
  { path: 'mediapost-single', component: MediapostSingleComponent},
  { path: 'mediapost-form', component: MediapostFormComponent},
  { path: 'mediapost-list', component: MediapostListComponent},
  { path: 'mediacomment-list', component: MediacommentListComponent},
  { path: 'mediacomment', component: MediacommentComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    PostFormComponent,
    PostListComponent,
    CommentComponent,
    CommentListComponent,
    PostSingleComponent,
    MediapostListComponent,
    MediapostFormComponent,
    MediapostSingleComponent,
    MediacommentListComponent,
    MediacommentComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
  ],
  providers: [ AuthService, PostService, mediaPostService, 
              CommentService, mediaCommentService, FormBuilder, HttpClientModule, HttpClient,
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
