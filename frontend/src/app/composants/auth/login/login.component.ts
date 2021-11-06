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

  loginForm : FormGroup;
  errorMsg: string;
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required, Validators.email]],
      password: [null, [Validators.required, 
                        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]]
    })
  }
  onSubmit() {
    this.loading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.loginUser(email, password).then(
      (response: { message: string }) => {
        this.authService.loginUser(email, password).then(
          () => {
            this.loading = false;
            this.router.navigate(['/post-list']);
          }
        ).catch(
          (error) => {
            this.loading = false;
            this.errorMsg = error.message;
          }
        );
      }
    ).catch((error) => {
        this.loading = false;
        this.errorMsg = error.message;
    });
  }

}

