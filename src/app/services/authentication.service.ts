import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment.prod";

const baseUrl = environment.learningPlatformApiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    let apiUrl = baseUrl + `users/signin`;
    return this.http.post<any>(apiUrl,
      {email: email, password: password},
      {observe: "response"}).pipe(map(res => {
      if (res.status === 200) {

        localStorage.setItem("email", email.toLowerCase());
        localStorage.setItem("token", "my-super-secret-token-from-server");
        localStorage.setItem("name", res.body.Name.toString());
        localStorage.setItem("userId", res.body.UserId.toString());
        localStorage.setItem("type", res.body.Type.toString());
      }
      return res;
    }));
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
    localStorage.removeItem("userId");
    localStorage.removeItem("type");
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem("token") != null;
  }

  isUserTeacher(): boolean {
    return localStorage.getItem("type") === "T";
  }

  getCurrentUserId(): string | null{
    return localStorage.getItem("userId");
  }

  getCurrentUser(): string | null{
    return localStorage.getItem("name");
  }

  getCurrentEmail(): string | null{
    return localStorage.getItem("email");
  }

  isUserStudent():boolean {
    return localStorage.getItem("type") === "S";
  }
}
