import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'welcome',
      pathMatch: 'full'
  },
  {
      path: 'welcome',
      component: WelcomeComponent
  },
  {
      path: 'home',
      component: HomeComponent
  },
  {
      path: 'employee',
      component: EmployeeComponent
  },
  {
      path: '**',
      component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
