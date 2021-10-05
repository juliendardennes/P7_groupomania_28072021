import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // bouton de déconnexion - suppression token du localstorage- retour formulaire de connexion
  onSubmit() {
    if( confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      alert("Déconnexion ! Retour à l'accueil")
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else {
      alert ('Déconnexion annulé');
    }
    
  }

}
