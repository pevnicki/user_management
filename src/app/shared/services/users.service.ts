import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FbCreateResponse, User} from '../models';
import {environment} from '../../../environments/environment';


@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  create(user: User): Observable<User> {
    return this.http.post(`${environment.fbDbUrl}/users.json`, user)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...user,
          id: response.name,
          date: new Date(user.birthday)
        }
      }))
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.fbDbUrl}/users.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }


  remove(id: string): Observable<User> {
    return this.http.delete(`${environment.fbDbUrl}/users/${id}.json`)
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.fbDbUrl}/users/${user.id}.json`, user)
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.fbDbUrl}/users/${id}.json`)
      .pipe(map((user: User) => {
        return {
          ...user, id,
          date: new Date(user.birthday)
        }
      }))
  }

}
