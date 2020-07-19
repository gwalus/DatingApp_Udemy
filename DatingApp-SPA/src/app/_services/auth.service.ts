import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;  // zmienna przechowująca odkodowany token
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');  // ustawienie domyślnego zdjęcia
  currentPhotoUrl = this.photoUrl.asObservable(); // ustawiamy jako obserwowalne, dzięki takiemu podejściu będziemy mogli zmienić zdjęcie
  // w komponencie nav z poziomu komponentu edit profile

constructor(private http: HttpClient) { }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((responce: any) => {
        const user = responce;
        if (user) {
          localStorage.setItem('token', user.token); // ustawianie tekona w pamięci lokalnej klienta
          localStorage.setItem('user' , JSON.stringify(user.user)); // zostawienie danych o użytkowniku w pamięci lokalnej
          this.decodedToken = this.jwtHelper.decodeToken(user.token); // zdekodowanie tokenu do pobrania nazwy użytkownika
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
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
