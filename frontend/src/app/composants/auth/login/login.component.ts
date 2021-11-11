import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
    });
  }

  onSubmit() {
    this.loading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const firstName = this.loginForm.get('firstName').value;
    const lastName = this.loginForm.get('lastName').value;
    this.auth.createNewUser(email, password, firstName, lastName).then(
      () => {
        this.loading = false;
        this.router.navigate(['/post-list']);
      }
    ),(error) => {
        this.loading = false;
        this.errorMsg = error.message.split("01 ")[1]; 
        this.errorMsg = error;
      }
  }

}

