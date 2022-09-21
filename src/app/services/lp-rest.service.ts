import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {NEVER, Observable} from "rxjs";
import {LPTask} from "../models/lptask.model";

const baseUrl = environment.learningPlatformApiUrl;
@Injectable({
  providedIn: 'root'
})
export class LpRestService {

  constructor(private http: HttpClient) { }

  getTasks(userId: string): Observable<LPTask[]> {
    if (userId != null) {
      let apiUrl = `${baseUrl}tasks?user=${userId}`;
      return this.http.get<any>(apiUrl);
    }
    return NEVER;
  }
}
