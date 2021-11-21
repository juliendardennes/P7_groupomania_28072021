import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
    private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken = this.auth.getToken();
      const newRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });
  
      return next.handle(newRequest);
    }

  // intercept(req: HttpRequest<any>, next: HttpHandler) {

  //   const authToken = this.auth.getToken();
  //   if (
  //     authToken == null
  //   )
  //   {this.router.navigate(['/login'])}
  //   const newRequest = req.clone({
  //     headers: req.headers.set('Authorization', 'Bearer ' + authToken)
  //   });
  //   return next.handle(newRequest);
  // }
}


