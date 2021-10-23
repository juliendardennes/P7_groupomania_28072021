import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { PostService } from './service/post.service';
import { AuthInterceptor } from './composants/auth-interceptor';
import { CommentService } from './service/comment.service';


import { HeaderComponent } from './composants/header/header.component';
import { SignupComponent } from './composants/auth/signup/signup.component';
import { LoginComponent } from './composants/auth/login/login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostFormComponent } from './composants/post-form/post-form.component';
import { AuthGuard } from './service/auth-guard.service';
import { PostListComponent } from './composants/post-list/post-list.component';
import { CommentComponent } from './composants/comment/comment.component';
import { CommentListComponent } from './composants/comment-list/comment-list.component';


const appRoutes: Routes = [
  { path: '', component: PostListComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'post-form', component: PostFormComponent},
  { path: 'post-list', component: PostListComponent},
  { path: 'comment', component: CommentComponent}, 
  { path: 'comment-list', component: CommentListComponent}
  // { path: 'post-form', canActivate: [AuthGuard], component: PostFormComponent},
  // { path: 'post-list', canActivate: [AuthGuard], component: PostListComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    PostFormComponent,
    PostListComponent,
    PostListComponent,
    CommentComponent,
    CommentListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
  ],
  providers: [ AuthService, PostService, CommentService, FormBuilder, HttpClientModule, HttpClient,
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
