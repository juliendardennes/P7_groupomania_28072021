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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './post-list/post-list.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostFormComponent } from './post-form/post-form.component';

const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'post-list', component: PostListComponent},
  { path: 'post-form', component: PostFormComponent},
  { path: 'single-post', component: SinglePostComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    PostListComponent,
    SinglePostComponent,
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
  providers: [ AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
