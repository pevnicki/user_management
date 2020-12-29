import {Component, OnInit} from '@angular/core';
import {UsersService} from '../shared/services/users.service';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {User} from '../shared/models';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user: User
  isLoading = true

  constructor(
    private usersService: UsersService,
    private  route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.usersService.getById(params.id);
      })
    ).subscribe((user: User) => {
      this.user = user
      this.isLoading = false
    });
  }

}
