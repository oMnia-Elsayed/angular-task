import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DasboardComponent {

    /**
     * constructor
     * @param router 
     */
    constructor(private router: Router) {}
    

    /**
     * logout
     */
    public logout() {
      this.router.navigate(["/login"]);
    }
}
