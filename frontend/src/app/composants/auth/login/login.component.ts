import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  
  errorMsg: string;
  token: string;

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (this.auth.getToken()) {
      this.router.navigate(['post-list']);
    } else{
      this.loginForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      });
    }
  }

  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.auth.loginUser(email, password).then(
      () => {
        this.token = this.auth.getToken();
        this.auth.isAuth$.next(true);
        this.router.navigate(['/post-list']);
        window.location.reload();
      }
    ).catch(
      (error) => {
        this.auth.isAuth$.next(false);
        this.errorMsg = error.message;
      }
    );
  }

}

