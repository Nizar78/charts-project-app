import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tutorial } from '../Tutorial';
import { TutorialService } from '../tutorial.service';
import { FormGroup, FormBuilder } from '@angular/forms'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-form-tutorial',
  templateUrl: './form-tutorial.component.html',
  styleUrls: ['./form-tutorial.component.css']
})



export class FormTutorialComponent implements OnInit {

  message: string = "";
  tutorialId:number=0;
  tutorialFormGroup!:FormGroup;

  constructor(private route: ActivatedRoute, private tutorialService: TutorialService,private fb:FormBuilder) { }

  ngOnInit() {
    this.tutorialId = this.route.snapshot.params['id'];
    this.tutorialService.getTutorialById(this.tutorialId).subscribe({
      next : (tutorial) =>{
        this.tutorialFormGroup= this.fb.group({
            id: this.fb.control(tutorial.id),
            title: this.fb.control(tutorial.title),
            description: this.fb.control(tutorial.description),
            published: this.fb.control(tutorial.published),
        });

      }, error : error =>{
          console.log(error);
      }

    });
  }
  update() {
    let tutorial : Tutorial = this.tutorialFormGroup.value; 
    this.tutorialService.updateTutorial(tutorial).subscribe({

      next :data =>{

        console.log(JSON.stringify(data));
        this.message = data.message;
      }
    });
  }
}

