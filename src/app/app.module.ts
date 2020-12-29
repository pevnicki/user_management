import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {UserPageComponent} from './user-page/user-page.component';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AppRoutingModule} from './app-routing.module';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {UserComponent} from './shared/components/user/user.component';
import {SharedModule} from './shared/shared.module';
import {AuthInterceptor} from './shared/components/auth.interceptor';
import {environment} from '../environments/environment';
import {AppStateModule} from './shared/state/app.state.module';


const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserPageComponent,
    MainLayoutComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    AppStateModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
