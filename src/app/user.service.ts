import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  signup(data) {
    console.log('api is', this.apiUrl);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http
      .post<any>(`${this.apiUrl}/rest-user/registration/`, data, {
        headers: headers,
      })
      .pipe(
        map((user) => {
          return user;
        })
      );
  }
}
