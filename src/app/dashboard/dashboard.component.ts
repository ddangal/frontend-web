import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  uploadForm:FormGroup
  constructor(
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
  }

 
  pictureUpload(){
    this.uploadForm = this.formBuilder.group({
      photo:[null],
     
    }, { validators: [this.checkFileExtension] });
  }
  get upload(){
    return this.uploadForm.errors
  }
  checkFileExtension(group: FormGroup) {
    let controls = group.controls,
      photo = controls.photo.value
      

    let photoError = false
     
    let extension = ['jpeg', 'jpg', 'png', 'docx', 'doc', 'txt', 'pdf', 'ppt'];
    if(photo) {
      let citizenValue = photo.name;
      let lastExt = citizenValue.substring(citizenValue.lastIndexOf('.') + 1).toLowerCase();
      if(extension.indexOf(lastExt) === -1){
        photoError = true;
      } else {
        photoError = false;
      }
    }
  }

    onPhotoSelect(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.upload.citizenship_certificate.setValue(file);
  
        // since the design used for html file input does not show the name of the selected file
        // show the file name selected programatically
        var fileName = file.name;
        $(event.target).next('.custom-file-label').html(fileName);
      }
    }


}
