import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private AuthService: AuthService,
              private router : Router) { }

  ngOnInit() {
    this.initForm();
  }

  // formulaire de connexion
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }
  
  // formulaire pour s'identifier et stocker token dans localstorage
  loginProcess() {
    if(this.formGroup.valid) {
      this.AuthService.login(this.formGroup.value).subscribe(result=> {
        if (!result.success) {
          console.log("connexion autorisé");
          localStorage.setItem( "token", JSON.stringify(result) );
          this.router.navigate(['home']);

        }else {
          alert("identifiant inconnu")
        }
      })
    }
  }


  // onLogin() {
  //   this.AuthService.login();
  // };

}
