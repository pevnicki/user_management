import {createReducer, on} from '@ngrx/store'
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'

import {User} from '../../models'
import * as UserActions from '../actions/user.actions'


export const userFeatureKey = 'users'

export interface State extends  EntityState<User> {
  users?: User[]
  currentUser?: User
  deleteTaskId?: string
  result?: any
  isLoading?: boolean
  isLoadingSuccess?: boolean
  isLoadingFailure?: boolean
  error?: string
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>()
export const initialState: State = adapter.getInitialState({
  isLoading: false,
  error: ''
})

export const userReducer = createReducer(
  initialState,
  // Get Users Reducer
  on(UserActions.getUsers, (state) => ({...state, isLoading: true})),

  on(UserActions.getUsersSuccess,
    (state, action) =>
      adapter.setAll(action.users, {
        ...state,
        isLoading: false,
        isLoadingSuccess: true
      })
  ),

// Delete User Reducers

  on(UserActions.deleteUser, (state, action) =>
    adapter.removeOne(action.userId, {...state, isLoading: false})
  ),

  // Edit User Reducers
  on(UserActions.editUser, (state, {user}) => ({...state, isLoading: true, currentUser: user})),
  on(UserActions.editUserSuccess, (state, action) => {
    console.log(action)
    return adapter.updateOne(action, {...state, isLoading: false})
    }
  ),

  // Create Task Reducers
  on(UserActions.createUser, (state, {user}) => ({...state, isLoading: true, currentUser: user})),
  on(UserActions.createUserSuccess, (state, result) => {
    {
      return adapter.setOne(result, {
        ...state,
        isLoading: false,
        isLoadingSuccess: true
      })
    }
  }),
)





export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors()

export const selectIsLoading = (state: State) => state.isLoading
export const selectError = (state: State) => state.error

