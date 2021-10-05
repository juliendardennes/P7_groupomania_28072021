import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';


import { HeaderComponent } from './composants/header/header.component';
import { SignupComponent } from './composants/auth/signup/signup.component';
import { LoginComponent } from './composants/auth/login/login.component';
import { FooterComponent } from './composants/footer/footer.component';
import { HomeComponent } from './composants/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostFormComponent } from './composants/post/post.component';
import { PostsService } from './service/post.service';
import { PostListComponent } from './composants/post-list/post-list.component';

export const ROUTES: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'post', component: PostFormComponent},
  { path: '', component: LoginComponent}]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    PostFormComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    AppRoutingModule,
  ],
  providers: [ AuthService, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
