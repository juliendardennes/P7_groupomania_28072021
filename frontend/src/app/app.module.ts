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
import { PostComponent } from './composants/post/post.component';
import { ProfilComponent } from './composants/profil/profil.component';


export const ROUTES: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profil', component: ProfilComponent},
  { path: 'home', component: HomeComponent},
  { path: 'post', component: PostComponent},
  { path: '', component: LoginComponent}]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    PostComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    AppRoutingModule,
  ],
  providers: [ AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
