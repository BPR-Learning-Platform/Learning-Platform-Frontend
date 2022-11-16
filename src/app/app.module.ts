import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationInterceptor} from "./authentication.interceptor";
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './components/task/task.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxNavbarModule} from "ngx-bootstrap-navbar";
import {NgParticlesModule} from "ng-particles";
import {NgChartsModule} from "ng2-charts";
import { MainStatisticsComponent } from './components/main-statistics/main-statistics.component';
import { SpecificStatisticsComponent } from './components/specific-statistics/specific-statistics.component';
import { SignupComponent } from './components/signup/signup.component';
import {MatSelectModule} from "@angular/material/select";
import { GradeStatisticsComponent } from './components/grade-statistics/grade-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    TaskComponent,
    SpinnerComponent,
    MainStatisticsComponent,
    SpecificStatisticsComponent,
    SignupComponent,
    GradeStatisticsComponent
  ],
    imports: [
        BrowserModule, RouterModule.forRoot([
            {path: '**', component: PageNotFoundComponent},
        ]),
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        NgxNavbarModule,
        NgParticlesModule,
        NgChartsModule,
        CommonModule, MatSelectModule
    ],
  providers: [
    AuthenticationInterceptor,
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
