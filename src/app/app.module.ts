import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatatableComponent } from './datatable/datatable.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormTutorialComponent } from './form-tutorial/form-tutorial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTemplateComponent } from './user-template/user-template.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    DatatableComponent,
    FileuploadComponent,
    FormTutorialComponent,
    UserTemplateComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
