import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';


import { HeaderComponent } from './composants/header/header.component';
import { SignupComponent } from './composants/auth/signup/signup.component';
import { LoginComponent } from './composants/auth/login/login.component';
import { FooterComponent } from './composants/footer/footer.component';
import { HomeComponent } from './composants/home/home.component';
import { UserService } from './service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './composants/post/post.component';


export const ROUTES: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'post', component: PostComponent},
  { path: '', component: LoginComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    AppRoutingModule,
  ],
  providers: [ LoginService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
