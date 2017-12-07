import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  //private _appUrl = 'http://localhost:3000/';
  private _appUrl = '';
  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this._appUrl}users/register`, user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this._appUrl}users/authenticate`, user, {headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this._appUrl}users/profile`, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  checkEmailAvailable(email: string): Observable<boolean> {
    return this.http.post(`${this._appUrl}users/checkemail`, { email: email })
      .map(res => res.json())
      .map(item => {
        if(item.email === 'alreadyexists'){
          return false;
        }else{
          return true;
        }
      });
  }

  checkUsernameAvailable(username: string): Observable<boolean> {
    return this.http.post(`${this._appUrl}users/checkusername`, { username: username })
      .map(res => res.json())
      .map(item => {
        if(item.username === 'alreadyexists'){
          return false;
        }else{
          return true;
        }
      });
  }


  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getUser(){
    return this.user;
  }

}
