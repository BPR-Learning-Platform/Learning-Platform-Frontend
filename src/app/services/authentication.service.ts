import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment.prod";
import {NewUser, User} from "../models/user.model";

const baseUrl = environment.learningPlatformApiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    let apiUrl = baseUrl + `users/signin`;
    return this.http.post<any>(apiUrl,
      {email: email, password: password},
      {observe: "response"}).pipe(map(res => {
        let user: User = res.body;
      if (res.status === 200) {
        localStorage.setItem("token", "my-super-secret-token-from-server");
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    }));
  }

  signup(user: NewUser): Observable<any> {
    let apiUrl = baseUrl + `users`;
    return this.http.post<any>(apiUrl, user,{observe: "response"});
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem("token") != null;
  }

  getCurrentUserId(): string | null{
    return JSON.parse(localStorage.getItem("user") || "{}").userId;
  }

  getCurrentUser(): string | null{
    return JSON.parse(localStorage.getItem("user") || "{}").name || null;
  }

  getCurrentEmail(): string | null{
    return JSON.parse(localStorage.getItem("user") || "{}").email;
  }

  isUserRole(type: string): boolean {
    return JSON.parse(localStorage.getItem("user") || "{}").type === type;
  }
}
