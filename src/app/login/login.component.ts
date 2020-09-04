import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hasError: Boolean;
  errorMessage: String;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.hasError = false;
    const { username, password } = this.loginForm.value;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    console.log(this.loginForm.value);
    this.service.login(formData).subscribe(
      (res) => {
        console.log('res:', res);
        localStorage.setItem('user', res);
        this.router.navigateByUrl('/profile');
      },
      (error) => {
        this.hasError = true;
      }
    );
  }
}
