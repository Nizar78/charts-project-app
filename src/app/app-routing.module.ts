import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatatableComponent } from './datatable/datatable.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { FormTutorialComponent } from './form-tutorial/form-tutorial.component';
import { UserTemplateComponent } from './user-template/user-template.component';
import {AuthGuard} from './auto.guard'

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },

  { 
    path: 'user', component: UserTemplateComponent , canActivate: [AuthGuard],children:[

      { path: 'dashboard', component: DashboardComponent },
      { path: 'datatable', component: DatatableComponent },
      { path: 'fileupload', component: FileuploadComponent },
      {path: 'formtutorial/:id', component: FormTutorialComponent },

    ]
  
  },

  
  { path: '', redirectTo: '/signin', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/signin' }, 

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule , RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
