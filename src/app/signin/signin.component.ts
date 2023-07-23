import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { TutorialService } from '../tutorial.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  formLogin: FormGroup;
  message : String="";

  constructor(private fb: FormBuilder, private router: Router, private tutorialService: TutorialService) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    });
  }

  login() {
    const username = this.formLogin.value.username;
    const password = this.formLogin.value.password;

    this.tutorialService.authenticate(username, password).subscribe(authenticated => {
      if (authenticated) {
        this.tutorialService.setCredentials(username,password);
        // If authentication is successful, navigate to '/user/dashboard'
        this.router.navigate(['/user/dashboard']);
      } else {
        // If authentication fails, you can handle it based on your requirement
        console.log('Authentication failed');
        this.message = this.tutorialService.message;
      }
    });
  }

}
