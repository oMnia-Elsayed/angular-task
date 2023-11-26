import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
   * @param router
   * @param toastr
   */
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private toastr: ToastrService) {}

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
   * @returns void
   */
  public login(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm).subscribe(() => {
        if(this.loginForm.value.username.toLowerCase() === "admin") {
          localStorage.setItem("userRole", "admin");
        } else {
          localStorage.setItem("userRole", "user");
        }
        this.router.navigate(["/dashboard"]);
      }, () => {

        this.toastr.error('Something went wrong !!!', 'Login');
      });
    }
  }

}
