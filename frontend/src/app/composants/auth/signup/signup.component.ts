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
  // errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    })
  }
  onSubmit() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const firstName = this.signUpForm.get('firstName').value;
    const lastName = this.signUpForm.get('lastName').value;
    this.authService.createNewUser(email, password, firstName, lastName).then(
      ()=> {
        console.log('inscription validé !')
        this.router.navigate(['login']);
      },
      (error) => {
        // this.errorMessage = error;
        alert('Il se peut que vous ayez déjà un compte, ou il y a erreur de saisie !')
      }
    );
  }
  
}
