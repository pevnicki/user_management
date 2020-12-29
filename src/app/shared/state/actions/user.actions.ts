import {createAction, props} from '@ngrx/store'
import {User} from '../../models'

export const GET_USERS = '[User] Get Users'
export const GET_USERS_SUCCESS = '[User] Get Users Success'
export const GET_USERS_FAILURE = '[User] Get Users Failure'

export const CREATE_USER = '[User] Create User'
export const CREATE_USER_SUCCESS = '[User] Create User Success'
export const CREATE_USER_FAILURE = '[User] Create User Failure'

export const DELETE_USER = '[User] Delete User'

export const EDIT_USER = '[User] Edit User'
export const EDIT_USER_SUCCESS = '[User] Edit User Success'
export const EDIT_USER_FAILURE = '[User] Edit User Failure'

export const getUsers = createAction(
  GET_USERS
)

export const getUsersSuccess = createAction(
  GET_USERS_SUCCESS,
  props<{users: User[]}>()
)

export const getUsersFailure = createAction(
  GET_USERS_FAILURE,
  props<{any}>()
)

export const createUser = createAction(
  CREATE_USER,
  props<{user: User}>()
)

export const createUserSuccess = createAction(
  CREATE_USER_SUCCESS,
  props<any>()
)

export const createUserFailure = createAction(
  CREATE_USER_FAILURE,
  props<{any}>()
)

export const deleteUser = createAction(
  DELETE_USER,
  props<{userId: string}>()
)

export const editUser = createAction(
  EDIT_USER,
  props<{user: User}>()
)

export const editUserSuccess = createAction(
  EDIT_USER_SUCCESS,
  props<any>()
)

export const editUserFailure = createAction(
  EDIT_USER_FAILURE,
  props<{any}>()
)






// export const requestLoadUsers = createAction(
//   GET_USERS
// )
//
// export const loadUsers = createAction(
//   '[User] Fetch All Users',
//   props<{ users: User[] }>()
// )
//
// export const updateUser = createAction(
//   '[User] Update user',
//   props<{ product: Update<User> }>()
// )
//
// export const deleteUser = createAction(
//   '[User] Delete User',
//   props<{ id: string }>()
// )
// export const deleteUserSuccess = createAction(
//   '[User] Delete User Success',
//   props<{ id: string }>()
// )
//
// export const loadFailed = createAction(
//   '[User] Delete User Failure',
//   props<{ error: string }>()
// )
