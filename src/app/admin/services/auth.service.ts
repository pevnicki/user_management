import {Injectable} from '@angular/core'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { User, FbAuthResponse } from '../../shared/models'
import {Observable, Subject, throwError} from 'rxjs'
import {environment} from '../../../environments/environment'
import {catchError, tap} from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(tap(this.setToken),
        catchError(this.handleError.bind(this)))
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const {message} = error.error.error

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not exits')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Email not correct')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password')
        break
    }

    return throwError(error)
  }

  logout(): void {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: FbAuthResponse | null): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
