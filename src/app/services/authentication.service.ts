import { Injectable } from '@angular/core';
import { catchError, Observable, NEVER, throwError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment.prod";

const baseUrl = environment.learningPlatformApiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  handleLoginRequestErrors(obs: Observable<any>): Observable<any>{
    return obs.pipe(catchError(err => {
        if (!!err.status && err.status === 401){
          localStorage.removeItem("email");
          return NEVER;
        }
        return throwError(err);
      }),
      map(res => {
        if (res.status === 200) {
          localStorage.setItem("token", "my-super-secret-token-from-server");
          localStorage.setItem("name", res.body.toString());
        }
        return res;
      }));
  }

  login(email: string, password: string): Observable<any> {
    let apiUrl = baseUrl + `users/signin`;
    localStorage.setItem("email", email);
    return this.handleLoginRequestErrors(this.http.post<any>(apiUrl,
      {email: email, password: password},
      {observe: "response"}));
  }

  signup(name: string, email: string, password: string): Observable<any> {
    let apiUrl = baseUrl + `users`;
    return this.http.post<any>(apiUrl,
      {name: name, email: email, password: password},
      {observe: "response"});
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem("token") != null;
  }

  getCurrentUser(): string | null{
    return localStorage.getItem("name");
  }

  getCurrentEmail(): string | null{
    return localStorage.getItem("email");
  }
}
