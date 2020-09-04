import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup
  submitted=false
  loading=false
  notification ={
    msg:'',
    class:''
  }
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService
  ) { }

  ngOnInit() {
  }
  signup(){
    this.signupForm =this.formBuilder.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      country:['',Validators.required],
      city:['',Validators.required],
      street:['',Validators.required],
    })
  }
  get form() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid

   if (this.signupForm.invalid) {
      return;
    }
   
    this.loading = true;
    
    const formData = new FormData();
    // personal details
    formData.append('first_name', this.signupForm.get('first_name') ? this.signupForm.get('first_name').value:null);     
    formData.append('last_name', this.signupForm.get('last_name')? this.signupForm.get('last_name').value:null);     
    formData.append('email', this.signupForm.get('email')? this.signupForm.get('email').value:null);     
    formData.append('password', this.signupForm.get('password')? this.signupForm.get('password').value:null); 
    formData.append('country', this.signupForm.get('country')? this.signupForm.get('country').value:null); 
    formData.append('street', this.signupForm.get('street')? this.signupForm.get('street').value:null); 
    formData.append('city', this.signupForm.get('city')? this.signupForm.get('city').value:null); 

         
    this.userService.signup(formData)
      .pipe(first())
      .subscribe(
        data => {
          this.notification.class = 'success';
          this.notification.msg = 'Thank you for registering.';
        },
        error => {

          this.loading = false;
          this.notification.class = 'danger';
          this.notification.msg = 'Sorry you cannot process to registration';

        });
  }
}
