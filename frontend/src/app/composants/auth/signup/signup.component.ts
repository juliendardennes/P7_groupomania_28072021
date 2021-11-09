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

  signupForm: FormGroup;
  // loading: boolean;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
    });
  }

  onSubmit() {
    // this.loading = true;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const firstName = this.signupForm.get('firstName').value;
    const lastName = this.signupForm.get('lastName').value;
    this.auth.createNewUser(email, password, firstName, lastName).then(
      () => {
        // this.loading = false;
        this.router.navigate(['/login']);
      }
    ),(error) => {
        // this.loading = false;
        // this.errorMsg = error.message.split("01 ")[1]; 
        this.errorMsg = error;
      }
  }

}