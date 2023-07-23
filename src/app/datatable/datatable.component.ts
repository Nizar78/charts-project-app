import { Component } from '@angular/core';
import { Tutorial } from '../Tutorial';
import { TutorialService } from '../tutorial.service';
import {Router} from '@angular/router'

 
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent {

  tutorials: Tutorial[] = []
  message : String="";
  totalPage:number =0;
  currentPage:number=0;
  constructor(private tutorialService: TutorialService, private router:Router) { }

  ngOnInit(): void {
    this.tutorialService.getTutorials().subscribe((data: Tutorial[]) => {
      console.log(data['content']);
      this.tutorials= data['content'];
      //this.tutorialService.tutorials = data['content'];
      this.totalPage=data["totalPages"];
      this.currentPage=data["pageable"].pageNumber;
      console.log(this.currentPage);

    });
    

  }
  delete(id: number) {
    this.tutorialService.delete(id).subscribe(
      data => {
        this.message = JSON.parse(data).message;
        console.log('deleted response', JSON.parse(data).message);
        // To update the table when deleting an item
        this.tutorialService.getTutorials().subscribe((data: Tutorial[]) => {
          console.log(data);
          this.tutorials= data['content'];
      this.tutorialService.tutorials = data['content'];
        });
      }
    )
  }
  handleupdate(tutorial: Tutorial){

    this.router.navigateByUrl(`user/formtutorial/${tutorial.id}`);

  }
  paginate(page:number){
      const currentPage = page;
      this.tutorialService.getPage(currentPage).subscribe((data: Tutorial[]) => {
        this.tutorials= data['content'];
        console.log(data);
        this.currentPage=data["pageable"].pageNumber;
        console.log(this.currentPage);

  
      });


  }

}
