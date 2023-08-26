import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
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
  public logout(): void {
    localStorage.removeItem("isAdmin");
    this.router.navigate(["/login"]);
  }
}

