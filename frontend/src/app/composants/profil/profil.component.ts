import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from'src/app/models/user.model';
import { Router} from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  users: User[];
  usersSubscription: Subscription;
  @Input()userId: string;


  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usersSubscription = this.authService.isAuth$.subscribe(
      // (users: User[]) => {
      //   this.users = users;
      // }
    );
    this.authService.getUserId();
  }


}
