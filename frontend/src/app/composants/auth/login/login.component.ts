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
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.loginUser(email, password).then(
      ()=> {
        console.log('connexion validé !')
        this.router.navigate(['/post-list']);
      },
      (error) => {
        // this.errorMessage = error;
        alert('données non valides. Réessayer !')
      }
    );
  }
}