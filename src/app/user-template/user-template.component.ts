import { Component } from '@angular/core';
import { TutorialService } from '../tutorial.service';

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.css']
})
export class UserTemplateComponent {

  constructor(private tutorialService: TutorialService) { }

  logout(){
    this.tutorialService.logout();

  }

}
