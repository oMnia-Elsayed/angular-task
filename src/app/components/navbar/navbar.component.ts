import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
  ]
})
export class NavbarComponent {

  /**
   * constructor
   * @param router
   */
  constructor(private router: Router) { }

  /**
  * logout
  */
  public logout() {
    localStorage.removeItem("isAdmin");
    this.router.navigate(["/login"]);
  }
}

