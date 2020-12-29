import {createFeatureSelector, createSelector} from '@ngrx/store'

import * as fromStore from '../reducers/user.reducer'

const productsSelectorState = createFeatureSelector<fromStore.State>(fromStore.userFeatureKey)

export const isLoading = createSelector(
  productsSelectorState,
  state => state.isLoading
)

export const users = createSelector(
  productsSelectorState,
  fromStore.selectAll
)

export const error = createSelector(
  productsSelectorState,
  state => state.error
)

