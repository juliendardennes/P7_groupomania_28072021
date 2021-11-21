import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading: boolean;
  errorMsg: string;
  user: User;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.auth.getToken()) {
      this.router.navigate(['post-list']);
    } else {
      this.signupForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
        firstName: [null,[Validators.required]],
        lastName: [null,[Validators.required]],
      });
    }
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const firstName = this.signupForm.get('firstName').value;
    const lastName = this.signupForm.get('lastName').value;
    this.auth.createNewUser(email, password, firstName, lastName).then(
      (response) => {
        response;
        this.router.navigate(['/login']);
      }
    ).catch((error) => {
        this.errorMsg = error.message;
      })
  }

}