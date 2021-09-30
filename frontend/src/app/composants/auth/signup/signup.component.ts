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

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }
 
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User (
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['password']
      
    );
    this.authService.saveUsersToServer(newUser);
    this.router.navigate(['/login']);
  }
  
  

}