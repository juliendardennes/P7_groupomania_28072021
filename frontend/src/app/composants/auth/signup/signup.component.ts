import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  signUpForm : FormGroup;
  loading: boolean;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}


  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required, 
                        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const firstName = this.signUpForm.get('firstName').value;
    const lastName = this.signUpForm.get('lastName').value;
    this.authService.createNewUser(email, password, firstName, lastName).then(
      () => {
        this.loading = false;
        this.router.navigate(['login']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }


}
