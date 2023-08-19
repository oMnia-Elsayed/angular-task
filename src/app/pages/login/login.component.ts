import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent { 
  
  /** loginForm */
  public loginForm: FormGroup;

  /**
   * constructor
   * @param formBuilder 
   * @param userService
   */
  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

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
      this.userService.login(this.loginForm);
    }
  }

}
