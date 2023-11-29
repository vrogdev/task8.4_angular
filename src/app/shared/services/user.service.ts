import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Credentials} from "../models/credentials";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly loginUrl: string;
  readonly userUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginUrl = 'http://localhost:8080/auth/login';
    this.userUrl = 'http://localhost:8080/api/users/';
  }

  login(credentials: Credentials): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.loginUrl, credentials, {observe: 'response'});
  }

  logout(): void {
    localStorage.removeItem("user")
    localStorage.removeItem("userId")
    localStorage.removeItem("role")

    this.router.navigate(['']);
  }

  authorizeUser(username: string): boolean {
    this.getUserId(username)
      .subscribe(response => {
        if (response.status == 200) {
          let user = response.body;
          localStorage.setItem("user", user.name)
          localStorage.setItem("userId", user.id)

          return true;
        } else {
          console.log(`error on user authorization: `, response.status)
        }
      });

    return false
  }

  isAuthorized(): boolean {
    if (localStorage.getItem("user") && localStorage.getItem("userId")) {
      return true;
    }

    return false;
  }

  getUserId(username: string): Observable<HttpResponse<any>> {
    const url = `${this.userUrl}username/${username}`;
    return this.http.get<any>(url, {observe: 'response'});
  }

  getAuthorizedUsername() {
    if (this.isAuthorized()) {
      return localStorage.getItem("user");
    }
  }

  getAuthorizedUserId() {
    if(this.isAuthorized()) {
      return localStorage.getItem("userId")
    }
  }
}
