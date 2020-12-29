import {Component, OnDestroy, OnInit} from '@angular/core'
import {UsersService} from '../../shared/services/users.service'
import {User} from '../../shared/models'
import {Observable, Subscription} from 'rxjs'
import {Store} from '@ngrx/store'

import * as fromStore from '../../shared/state/reducers/user.reducer'
import * as fromActions from '../../shared/state/actions/user.actions'
import * as fromSelector from '../../shared/state/selectors/user.selector'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  searchStr: any = ''
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

  remove(userId: string): void {
    this.store.dispatch(fromActions.deleteUser({userId}))
  }
}
