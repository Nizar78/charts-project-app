import { TutorialService } from '../tutorial.service';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent  {
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;

  constructor(private tutorialService: TutorialService) { }
  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
  ngOnInit(): void {
    this.fileInfos = this.tutorialService.getFiles();
  }

  uploadFile(): void {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0)!;
    this.tutorialService.uploadFile(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.tutorialService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined!;
      });
    this.selectedFiles = undefined!;
  }
  
}
