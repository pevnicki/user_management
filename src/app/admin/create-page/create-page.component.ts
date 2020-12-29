import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {User} from '../../shared/models'
import {UsersService} from '../../shared/services/users.service'
import {Store} from '@ngrx/store'
import * as fromStore from '../../shared/state/reducers/user.reducer'
import * as fromSelector from '../../shared/state/selectors/user.selector';
import {Observable} from 'rxjs';
import {createUser} from '../../shared/state/actions/user.actions';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup
  isLoading$: Observable<boolean>
  error$: Observable<string | null>

  constructor(private userService: UsersService, private store: Store<fromStore.State>) {
  }

  ngOnInit(): void {

    this.isLoading$ = this.store.select(fromSelector.isLoading)
    this.error$ = this.store.select(fromSelector.error)

    this.form = new FormGroup({
      first_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      address: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      ip_address: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      age: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required])
    })
  }

  submit(): void {
    if (this.form.invalid) {
      return
    }
    const newUser: User = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      address: this.form.value.address,
      email: this.form.value.email,
      ip_address: this.form.value.ip_address,
      age: this.form.value.age,
      birthday: this.form.value.birthday
    }

    this.store.dispatch(createUser({user: newUser}))
    this.form.reset()
  }
}
