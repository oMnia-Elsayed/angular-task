import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;

  let fixture: ComponentFixture<NavbarComponent>;

  let router: Router;

  class MockedRouter {
    /** navigate */
    public navigate = () => {}
}


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: Router, useClass: MockedRouter },
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check logout function works fine', () => {

    spyOn(router, 'navigate');

    component.logout();

    expect(router.navigate).toHaveBeenCalled();
  });

});
