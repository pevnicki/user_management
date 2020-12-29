import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {Store} from '@ngrx/store'
import {switchMap} from 'rxjs/operators'

import {UsersService} from '../../shared/services/users.service'
import {User} from '../../shared/models'
import {FormControl, FormGroup, Validators} from '@angular/forms'

import * as fromStore from '../../shared/state/reducers/user.reducer'
import * as fromActions from '../../shared/state/actions/user.actions'

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup
  submitted = false
  user: User
  userId: string

  constructor(
    private  route: ActivatedRoute,
    private usersService: UsersService,
    private store: Store<fromStore.State>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.userId = params.id
        return this.usersService.getById(params.id)
      })
    ).subscribe((user: User) => {
      this.user = user
      this.form = new FormGroup({
        address: new FormControl(user.address, [Validators.required, Validators.minLength(10)]),
        email: new FormControl(user.email, [Validators.required, Validators.email]),
        ip_address: new FormControl(user.ip_address, [Validators.required, Validators.minLength(10)]),
        age: new FormControl(user.age, [Validators.required]),
        birthday: new FormControl(user.birthday, [Validators.required])
      })
    })
  }

  submit(): void {
    if (this.form.invalid) {
      return
    }
    this.submitted = true

    this.user = {
      ...this.user,
      address: this.form.value.address,
      email: this.form.value.email,
      ip_address: this.form.value.ip_address,
      age: this.form.value.age,
      birthday: this.form.value.birthday
    }

    this.store.dispatch(fromActions.editUser({user: this.user}))
    this.submitted = false
  }

  delete(): void {
    this.store.dispatch(fromActions.deleteUser({userId: this.userId}))
    this.router.navigate(['/admin', 'main'])
  }
}
