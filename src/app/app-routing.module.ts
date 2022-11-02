import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {TaskComponent} from "./components/task/task.component";
import {AuthenticationGuard} from "./authentication.guard";
import {MainStatisticsComponent} from "./components/main-statistics/main-statistics.component";
import {SignupComponent} from "./components/signup/signup.component";

const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main-statistics', component: MainStatisticsComponent, canActivate: [AuthenticationGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthenticationGuard]},
  { path: 'create-user', component: SignupComponent, canActivate: [AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
