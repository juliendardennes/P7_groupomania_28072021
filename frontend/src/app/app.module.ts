import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { PostService } from './service/post.service';
import { AuthInterceptor } from './composants/auth-interceptor';


import { HeaderComponent } from './composants/header/header.component';
import { SignupComponent } from './composants/auth/signup/signup.component';
import { LoginComponent } from './composants/auth/login/login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostFormComponent } from './composants/post-form/post-form.component';
import { AuthGuard } from './service/auth-guard.service';


const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'post-form', component: PostFormComponent}
  
  // { path: 'post-form', canActivate: [AuthGuard], component: PostFormComponent},
  // { path: 'post-list', canActivate: [AuthGuard], component: PostListComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
  ],
  providers: [ AuthService, PostService, FormBuilder, HttpClientModule, HttpClient,
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
