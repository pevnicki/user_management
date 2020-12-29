import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import * as userReducer from './reducers/user.reducer'
import {UserEffects} from './effects/user.effects'


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(userReducer.userFeatureKey, userReducer.userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: []
})

export  class  AppStateModule{
}
