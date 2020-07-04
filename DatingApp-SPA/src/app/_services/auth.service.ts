import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;  // zmienna przechowująca odkodowany token

constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((responce: any) => {
        const user = responce;
        if (user) {
          localStorage.setItem('token', user.token); // ustawianie tekona w pamięci lokalnej klienta
          this.decodedToken = this.jwtHelper.decodeToken(user.token); // zdekodowanie tokenu do pobrania nazwy użytkownika
          console.log(this.decodedToken);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
