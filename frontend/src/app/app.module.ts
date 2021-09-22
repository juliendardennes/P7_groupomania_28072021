import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { UsersService } from './service/users.service';
import { HttpClientModule } from '@angular/common/http';


import { HeaderComponent } from './composants/header/header.component';
import { SignupComponent } from './composants/signup/signup.component';
import { LoginComponent } from './composants/login/login.component';
import { FooterComponent } from './composants/footer/footer.component';
import { HomeComponent } from './composants/home/home.component';


export const ROUTES: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent}, 
  { path: '', component: HomeComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    AppRoutingModule,
  ],
  providers: [ UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
