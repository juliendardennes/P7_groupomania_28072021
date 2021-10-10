import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './service/post.service';


import { HeaderComponent } from './composants/header/header.component';
import { SignupComponent } from './composants/auth/signup/signup.component';
import { LoginComponent } from './composants/auth/login/login.component';
import { FooterComponent } from './composants/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostFormComponent } from './composants/post-form/post-form.component';
import { PostListComponent } from './composants/post-list/post-list.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'post-form', component: PostFormComponent},
  { path: 'post-list', component: PostListComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    PostFormComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
  ],
  providers: [ AuthService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
