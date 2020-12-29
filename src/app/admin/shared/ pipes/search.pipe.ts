import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../../shared/models';

@Pipe({
  name: 'searchUsers'
})
export class SearchPipe implements PipeTransform {
  transform(users: User[], search: ''): User[] {
    if (!search.trim()) {
      return users
    }
    return users.filter(user => {
       return JSON.stringify(user).toLowerCase().includes(search)
    })
  }

}
