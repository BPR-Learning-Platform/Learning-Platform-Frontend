import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";

const baseUrl = environment.learningPlatformApiUrl;
@Injectable({
  providedIn: 'root'
})
export class LpRestService {

  constructor(private http: HttpClient) { }

  getTasks(userId: string): Observable<any> {
    let apiUrl = baseUrl + `users?userid=${userId}`;
    return this.http.get<any>(apiUrl);
  }
}
