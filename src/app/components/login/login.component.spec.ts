import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginComponent', () => {

    let component: LoginComponent;

    let fixture: ComponentFixture<LoginComponent>;

    let router: Router;

    class MockedRouter {
        /** navigate */
        public navigate = () => {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                LoginComponent,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                FormBuilder,
                { provide: Router, useClass: MockedRouter },
            ],
        });
        TestBed.compileComponents();
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.debugElement.componentInstance;
        router = TestBed.inject(Router);
    }));

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('check call constructLoginForm function after calling ngOnInit', () => {
        spyOn(component, 'constructLoginForm');

        component.ngOnInit();

        expect(component.constructLoginForm).toHaveBeenCalled();
    });

    it('check constructLoginForm function works fine', () => {

        component.constructLoginForm();

        expect(component.loginForm).toBeDefined();
    });

    it('check login function works fine', () => {

        spyOn(router, 'navigate');
        
        component.ngOnInit();
        
        component.loginForm?.controls['username']?.setValue('omnia');
        component.loginForm?.controls['password']?.setValue('omnia');

        component.login();

        expect(router.navigate).toHaveBeenCalled();
    });

    it('check login function works fine when the loginForm is not valid', () => {

        component.ngOnInit();
        component.login();

        expect(component.loginForm.valid).toBeFalsy();
    });

});
