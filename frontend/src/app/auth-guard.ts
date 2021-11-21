import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}


    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Promise<boolean> | boolean {
  
      return new Promise(
        (resolve, reject) => {
          if (this.auth.isAuth$ && sessionStorage.getItem('token')) {
            resolve(true);
          } else {
            this.router.navigate(['/login']);
            resolve(false);
          }
      });
    }
  // canActivate(route: ActivatedRouteSnapshot,
  //             state: RouterStateSnapshot): Promise<boolean> {
  //   return Observable.create(
  //     (observer) => {
  //       this.auth.isAuth$.subscribe(
  //         (auth) => {
  //           if (auth) {
  //             observer.next(true);
  //           } else {
  //             this.router.navigate(['/login']);
  //           }
  //         }
  //       );
  //     }
  //   );
  // }
}