import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent { 
  
  public loginForm: FormGroup;

  /**
   * constructor
   * @param formBuilder 
   * @param router
   */
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  /**
   * ngOnInit
   */
  public ngOnInit() {
    this.constructLoginForm();
  }

  /**
   * constructLoginForm
   */
  public constructLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });

  }

  /**
   * login
   */
  public login() {
    if (this.loginForm.valid) {
      this.router.navigate(["/dashboard"]);
    }
  }

}
