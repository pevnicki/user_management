import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../shared/models';
import {Store} from '@ngrx/store';
import * as fromStore from '../shared/state/reducers/user.reducer';
import * as fromActions from '../shared/state/actions/user.actions';
import * as fromSelector from '../shared/state/selectors/user.selector';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  users$: Observable<User[]>

  constructor(private store: Store<fromStore.State>) {
    this.store.dispatch(fromActions.getUsers())
  }

  ngOnInit(): void {
    this.users$ = this.store.select(fromSelector.users)
    this.isLoading$ = this.store.select(fromSelector.isLoading)
    this.error$ = this.store.select(fromSelector.error)
  }

}
