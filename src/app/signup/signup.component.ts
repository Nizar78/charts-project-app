import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { TutorialService } from '../tutorial.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formLogin: FormGroup;
  message : String="";
  constructor(private fb: FormBuilder, private router: Router, private tutorialService: TutorialService) { }
  
  ngOnInit() {
    this.formLogin = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    });
  }
  singup() {
    const username = this.formLogin.value.username;
    const password = this.formLogin.value.password;

    this.tutorialService.singup(username, password).subscribe(data => {

      if(data){
        this.router.navigate(['/user/dashboard']);
      }else {

        this.router.navigate(['signup']);
      }
    });
  }
 

}
