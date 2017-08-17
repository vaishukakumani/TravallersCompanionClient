import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {Http, HttpModule } from '@angular/http';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import { RouterModule} from '@angular/router';
import { AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {CalendarModule,AutoCompleteModule,DropdownModule} from 'primeng/primeng';
import { DatePickerModule} from 'ng2-datepicker';
import { AppComponent } from './app.component';
import {TOKEN_NAME} from './shared/auth.constants';
import {Globals} from './shared/globals';
import {routingComponents} from './app-routing.module';
import {UserLoginService} from './shared/services/userLogin.service';
import {AuthGuard} from './Guards/auth-guard.service';
import {AuthenticationService} from './shared/services/authentication.service';
export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
 
  declarations: [
    AppComponent,routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    CalendarModule,
    DatePickerModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    DropdownModule       
  ],
  providers: [
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    AuthenticationService,
    UserLoginService,
    AuthGuard,
    Globals],
  
  bootstrap: [AppComponent]
  
})
export class AppModule { }
