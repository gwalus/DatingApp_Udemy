import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};  // tutaj będziemy zapisywać naszego użytkownika i hasło

  constructor(private authService: AuthService) { } // wstrzyknięcie serwisu

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged is successfully');
    }, error => {
      console.log(error);
    });
  } // logowanie

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token; // jeśli coś jest w tym to zwróci true, jeśli jest pusty to zwróci false
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
  }
}
